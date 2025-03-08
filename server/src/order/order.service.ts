import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderStatus } from '@prisma/client';
import { OrderPaginationDto } from '../shared/order-pagination.dto';
import { plainToInstance } from 'class-transformer';
import { IOrder } from '../interfaces/order.interface';

@Injectable()
export class OrderService {
	private logger = new Logger(OrderService.name);
	constructor(private readonly prismaService: PrismaService) {}

	async updateOrderStatus(id: number, status: OrderStatus) {
		const order = await this.prismaService.order.findFirst({ where: { id } });
		if (!order) throw new NotFoundException('Закзаз не найден');
		const updateOrder = await this.prismaService.order.update({
			data: { status },
			where: { id },
		});
		return {
			id: updateOrder.id,
			status: updateOrder.status,
			user_id: updateOrder.userId,
		};
	}

	async getOrders(
		orderPagination: OrderPaginationDto,
		current_userId?: string,
	): Promise<[IOrder[], number]> {
		const {
			order,
			offset: skip,
			limit: take,
			status,
			actual_order,
			email,
		} = plainToInstance(OrderPaginationDto, orderPagination);

		if (order && order !== 'asc' && order !== 'desc') {
			throw new BadRequestException(
				`Нужно указать 'asc' или 'desc'. У вас указан '${order}'`,
			);
		}
		if (actual_order && actual_order !== 'actual' && actual_order !== 'notActual') {
			throw new BadRequestException(
				`Нужно указать 'actual' или 'notActual'. У вас указан '${actual_order}'`,
			);
		}

		const userId = email
			? (
					await this.prismaService.user.findFirst({
						where: { email },
					})
				)?.id
			: null;
		if (email && !userId) {
			return [[], 0];
		}

		const whereConditions = {
			...(actual_order === 'actual'
				? {
						OR: [
							{ status: OrderStatus.PENDING },
							{ status: OrderStatus.SHIPPED },
							{ status: OrderStatus.PROCESSING },
						],
					}
				: actual_order === 'notActual'
					? {
							OR: [
								{ status: OrderStatus.CANCELLED },
								{ status: OrderStatus.DELIVIRED },
							],
						}
					: status
						? { status }
						: {}),
			...(current_userId ? { userId: current_userId } : userId ? { userId } : {}),
		};

		const count = await this.prismaService.order.count({ where: whereConditions });
		const orders = await this.prismaService.order.findMany({
			skip,
			take,
			where: whereConditions,
			include: { user: true },
			orderBy: { createdAt: order },
		});
		const _orders: IOrder[] = await Promise.all(
			orders.map(async (val) => {
				const orderItem = await this.prismaService.orderItem.findFirst({
					where: { orderId: val.id },
					include: { product: true, payment: true },
				});
				return {
					id: val.id,
					user_email: val.user.email,
					status: val.status,
					product: {
						id: orderItem.product.id,
						name: orderItem.product.name,
						quantity: orderItem.quantity,
						price: orderItem.price,
					},
					payment: orderItem.payment.id,
					created_at: val.createdAt,
				};
			}),
		);
		return [_orders, count];
	}

	deleteOrder(id: number) {
		return this.prismaService.order.delete({ where: { id } });
	}

	createOrderItem(createOrderItem: CreateOrderItemDto) {
		return this.prismaService.orderItem.create({
			data: {
				productId: createOrderItem.productId,
				orderId: +createOrderItem.orderId,
				quantity: +createOrderItem.quantity,
				price: +createOrderItem.price,
				paymentId: createOrderItem.paymentId,
			},
		});
	}

	async deleteOrderItem(orderItemId: string) {
		return await this.prismaService.orderItem.delete({ where: { id: orderItemId } });
	}

	async createOrder(userId: string, paymentId: string) {
		const cart = await this.prismaService.cart.findFirst({ where: { userId } });
		const cartItem = await this.prismaService.cartItem.findMany({
			where: { cartId: cart.id },
			include: { product: true },
		});
		await this.prismaService.payment
			.create({ data: { id: paymentId } })
			.catch((e) => this.logger.error(e.message));
		const orderItem = await Promise.all(
			cartItem.map(async (val) => {
				const order = await this.prismaService.order.create({ data: { userId } });
				const orderItem = await this.prismaService.orderItem.create({
					data: {
						productId: val.productId,
						orderId: order.id,
						quantity: val.quantity,
						paymentId,
						price: val.product.price,
					},
				});
				return { ...orderItem, status: order.status };
			}),
		);
		await this.prismaService.cartItem.deleteMany({ where: { cartId: cart.id } });
		return orderItem;
	}
}
