import { Order } from '../../types/order.type.ts';

export interface IPagination {
	offset?: number;
	limit?: number;
	order?: Order;
}

export interface ICategoryPagination extends IPagination {
	category?: string;
}
