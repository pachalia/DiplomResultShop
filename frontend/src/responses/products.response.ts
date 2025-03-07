import { IProduct } from '@interfaces';

export interface IProductsResponse {
	ofset: number;
	limit: number;
	total: number;
	category: string;
	product: string;
	data: IProduct[];
}
