import { Order } from '@types';
import { IProduct } from './product.interface.ts';
import { Status } from './order.interface.ts';

export interface IPagination {
	offset?: number;
	limit?: number;
	order?: Order;
}

export interface IPaginationData<T> extends IPagination {
	data: T;
	total: number;
}

export interface IProductPagination extends IPagination {
	category?: string;
	product?: string;
}

export interface IOrderPagination extends IPagination {
	status?: string;
	email?: string;
	actual_order?: 'actual' | 'notActual';
}

export interface IOrder {
	id: string;
	user_email: string;
	status: Status;
	product: Pick<IProduct, 'id' | 'price' | 'quantity' | 'name'>[];
}
export interface IOrderPaginationData extends IPaginationData<IOrder[]> {}

export interface IProductPaginationData extends IPaginationData<IProduct[]> {}
