interface IAmount {
	value: string;
	currency: string;
}

interface ISource {
	account_id: string;
	amount: IAmount;
	platform_fee_amount: IAmount;
}

interface ICheckoutCustomer {
	full_name?: string;
	inn?: string;
	email?: string;
	phone?: string;
}

interface IReceipt {
	customer?: ICheckoutCustomer;
	tax_system_code?: number;
	phone?: string;
	email?: string;
}

export interface IPaymentRefund {
	id: string;
	payment_id: string;
	status: 'canceled' | 'succeeded';
	created_at: string;
	amount: IAmount;
	description: string;
	sources: ISource[];
	receipt?: IReceipt;
}
