import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderStatus } from '@prisma/client';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly paymentService: PaymentService,
	) {}

	async createOrder(id: string, userId: string) {
		const order = await this.prismaService.order.create({ data: { userId, id } });
		return {
			id: order.id,
			status: order.status,
			created_at: order.createdAt,
		};
	}

	async updateOrderStatus(id: string, status: OrderStatus) {
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

	async getOrdersByCurrentUser(userId: string) {
		const orders = await this.prismaService.order.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});
		if (!orders.length) return [];
		return await Promise.all(
			orders.map(async (val) => {
				const payment = await this.paymentService.getPayment(val.id);
				return {
					id: val.id,
					status: val.status,
					created_at: val.createdAt,
					amount: payment.amount.value,
				};
			}),
		);
	}

	async getOrders() {
		const orders = await this.prismaService.order.findMany({
			include: { user: true },
			orderBy: { createdAt: 'desc' },
		});
		return await Promise.all(
			orders.map(async (val) => {
				const payment = await this.paymentService.getPayment(val.id);
				return {
					id: val.id,
					status: val.status,
					created_at: val.createdAt,
					user_email: val.user.email,
					amount: payment.amount.value,
					in_amount: payment?.income_amount?.value ?? '',
					payment_status: payment.status,
				};
			}),
		);
	}

	deleteOrder(id: string) {
		return this.prismaService.order.delete({ where: { id } });
	}

	createOrderItem(createOrderItem: CreateOrderItemDto) {
		return this.prismaService.orderItem.create({
			data: {
				productId: createOrderItem.productId,
				orderId: createOrderItem.orderId,
				quantity: +createOrderItem.quantity,
				price: +createOrderItem.price,
			},
		});
	}
	async getOrderItemByOrderId(orderId: string) {
		const order = await this.prismaService.order.findFirst({
			where: { id: orderId },
			include: { user: { include: { address: true } } },
		});
		if (!order) throw new NotFoundException('Заказ не найден');
		const orderItem = await this.prismaService.orderItem.findMany({
			where: { orderId },
			include: {
				product: true,
			},
		});
		if (!orderItem) return [];
		const payment = await this.paymentService.getPayment(order.id);
		const _orderItem = orderItem.map((val) => {
			return {
				name: val.product.name,
				price_product: val.price,
				quantity: val.quantity,
				quantity_stock: val.product.quantity,
			};
		});
		return {
			address: {
				email: order.user.email,
				city: order.user.address.city,
				street: order.user.address.street,
				state: order.user.address.state,
				phone: order.user.address.phone,
			},
			payment,
			data: [..._orderItem],
		};
	}
}
