import { IProduct } from '../interfaces/product.interface.ts';

export interface IProductsResponse {
	ofset: number;
	category: string;
	data: IProduct[];
}
