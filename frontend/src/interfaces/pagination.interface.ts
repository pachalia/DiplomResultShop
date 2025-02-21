import { Order } from '@types';

export interface IPagination {
	offset?: number;
	limit?: number;
	order?: Order;
}

export interface ICategoryPagination extends IPagination {
	category?: string;
}
