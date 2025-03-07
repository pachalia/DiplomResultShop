import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { v4 } from 'uuid';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class PaymentService {
	private checkout = new YooCheckout({
		shopId: this.configService.get<string>('SHOP_ID'),
		secretKey: this.configService.get<string>('SHOP_SECRET_KEY'),
	});
	constructor(
		private configService: ConfigService,
		private prismaService: PrismaService,
	) {}

	async createPayment(value: string) {
		const idempotenceKey = v4();
		const createPayload: ICreatePayment = {
			amount: {
				value,
				currency: 'RUB',
			},
			capture: true,
			confirmation: {
				type: 'embedded',
				return_url: 'test',
			},
		};
		return await this.checkout.createPayment(createPayload, idempotenceKey);
	}

	async refund(paymentId: string, amount: string) {
		const idempotenceKey = v4();
		return this.checkout
			.createRefund(
				{ payment_id: paymentId, amount: { value: amount, currency: 'RUB' } },
				idempotenceKey,
			)
			.catch((e) => {
				console.log(e);
			});
	}

	async getPayment(paymentId: string) {
		const orderItem = await this.prismaService.orderItem.findMany({
			where: { paymentId },
			include: { product: true, order: true },
		});
		const order = await this.prismaService.order.findFirst({
			where: { id: orderItem[0].order.id },
			include: { user: { include: { address: true } } },
		});

		const _orderItem = orderItem.map((val) => {
			return {
				orderId: val.orderId,
				product: {
					id: val.productId,
					name: val.product.name,
					quantity: val.quantity,
					quantity_stock: val.product.quantity,
					price: val.price,
					image: val.product.image,
				},
			};
		});

		const payment = await this.checkout.getPayment(paymentId);
		return {
			email: order.user.email,
			address: order.user.address,
			payment,
			orderItem: _orderItem,
		};
	}

	async capturePayment(paymentId: string, amount?: string) {
		const payment = await this.checkout.getPayment(paymentId);
		const idempotenceKey = v4();
		if (payment.status === 'waiting_for_capture' && amount)
			return await this.checkout.capturePayment(
				paymentId,
				{ amount: { value: amount, currency: 'RUB' } },
				idempotenceKey,
			);
		if (payment.status === 'waiting_for_capture' && !amount)
			return await this.checkout.cancelPayment(paymentId);
		return payment;
	}
}
