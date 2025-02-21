import { IPaymentMethodType } from './payment.method.type.ts';
import { IVatData } from './vat.data.interface.ts';

export interface IPaymentMethodData {
	type: IPaymentMethodType;
	login?: string;
	phone?: string;
	payment_purpose?: string;
	vat_data?: IVatData;
	card?: {
		number: string;
		expiry_month: string;
		expiry_year: string;
		cardholder: string;
		csc: string;
	};
	payment_data?: string;
	payment_method_token?: string;
}
