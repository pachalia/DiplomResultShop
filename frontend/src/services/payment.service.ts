import axios from 'axios';
import { URL_API_PAYMENT } from '@constans';
import { IPayment } from '@interfaces';
import { IPaymentRefund } from '../interfaces/payment.refund.interface.ts';

export class PaymentService {
	static async createPayment(value: string) {
		return await axios
			.post<IPayment>(URL_API_PAYMENT, { value })
			.then((res) => res.data);
	}

	static async captureOrCancelPayment(paymentId: string, amount?: string) {
		return amount
			? await axios
					.put<IPayment>(URL_API_PAYMENT, { paymentId, amount })
					.then((res) => res.data)
			: await axios
					.put<IPayment>(URL_API_PAYMENT, { paymentId })
					.then((res) => res.data);
	}

	static async paymentRefund(paymentId: string, amount: string) {
		return await axios
			.post<IPaymentRefund>(`${URL_API_PAYMENT}/refund`, { paymentId, amount })
			.then((res) => res.data);
	}
}
