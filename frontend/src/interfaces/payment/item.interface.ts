import { IAmount } from './amount.interface.ts';
import { IPaymentSubject } from './payment.subject.type.ts';
import { IPaymentMode } from './payment.mode.type.ts';
import { IAgentType } from './agent.type.ts';

export interface IItem {
	description: string;
	quantity: string;
	amount: IAmount;
	vat_code: number;
	payment_subject?: IPaymentSubject;
	payment_mode?: IPaymentMode;
	product_code?: string;
	country_of_origin_code?: string;
	customs_declaration_number?: string;
	excise?: string;
	supplier?: {
		name?: string;
		phone?: string;
		inn?: string;
	};
	agent_type?: IAgentType;
}
