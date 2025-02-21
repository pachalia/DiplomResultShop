import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICreatePayment, Payment, YooCheckout } from '@a2seven/yoo-checkout';
import { v4 } from 'uuid';

@Injectable()
export class PaymentService {
	private checkout = new YooCheckout({
		shopId: this.configService.get<string>('SHOP_ID'),
		secretKey: this.configService.get<string>('SHOP_SECRET_KEY'),
	});
	constructor(private configService: ConfigService) {}

	async createPayment(value: string) {
		const idempotenceKey = v4();
		const createPayload: ICreatePayment = {
			amount: {
				value,
				currency: 'RUB',
			},
			confirmation: {
				type: 'embedded',
				return_url: 'test',
			},
		};
		return await this.checkout.createPayment(createPayload, idempotenceKey);
	}

	async refund(paymentId: string, amount) {
		const idempotenceKey = v4();
		return this.checkout.createRefund(
			{ payment_id: paymentId, amount },
			idempotenceKey,
		);
	}

	async getPayment(paymentId: string): Promise<Payment> {
		return await this.checkout.getPayment(paymentId);
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
