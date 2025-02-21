import { IAmount } from './amount.interface.ts';
import { PaymentStatus } from './payment.status.ts';

export interface ITransfer {
	account_id: string;
	amount: IAmount;
	status?: PaymentStatus;
	platform_fee_amount: IAmount;
}
