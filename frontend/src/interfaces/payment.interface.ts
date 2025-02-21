import { IAmount, IConfirmation, PaymentStatus } from '@interfaces';

interface IRecipient {
	account_id?: string;
	gateway_id: string;
}

export interface IPayment {
	id: string;
	status: PaymentStatus;
	amount: IAmount;
	recipient: IRecipient;
	created_at: string;
	confirmation: IConfirmation;
	test: boolean;
	paid: boolean;
	refundable: boolean;
}
