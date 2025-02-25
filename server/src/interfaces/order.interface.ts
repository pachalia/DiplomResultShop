import { OrderStatus } from '@prisma/client';
import { IPaymentStatus } from '@a2seven/yoo-checkout';

export interface IOrder {
	id: string;
	status: OrderStatus;
	created_at: Date;
	user_email: string;
	amount: string;
	in_amount: string;
	payment_status: IPaymentStatus;
}
