import { ICheckoutCustomer } from './checkoutCustomer.interface.ts';
import { IItemWithoutData } from './item.without.data.ts';

export interface IReceipt {
	customer?: ICheckoutCustomer;
	items: IItemWithoutData[];
	tax_system_code?: number;
	phone?: string;
	email?: string;
}
