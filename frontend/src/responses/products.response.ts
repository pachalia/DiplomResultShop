import { IProduct } from '../interfaces/product.interface.ts';

export interface IProductsResponse {
	ofset: number;
	limit: number;
	total: number;
	category: string;
	data: IProduct[];
}
