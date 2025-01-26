import { Order } from '../../types/order.type.ts';

export interface IPagination {
	offset?: number;
	limit?: number;
	category?: string;
	order?: Order;
}
