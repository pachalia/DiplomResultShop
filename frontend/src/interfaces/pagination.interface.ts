import { Order } from '@types';

export interface IPagination {
	offset?: number;
	limit?: number;
	order?: Order;
}

export interface IPaginationData<T> extends IPagination {
	data: T;
	total: number;
}

export interface ICategoryPagination extends IPagination {
	category?: string;
}
