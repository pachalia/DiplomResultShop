import axios from 'axios';
import { URL_API_PRODUCTS } from '../constans/url.constans.ts';
import { store } from '../redux/store.ts';
import { setProducts, updateProduct } from '../redux/features/slices/productSlice.ts';
import { IProductsResponse } from '../responses/products.response.ts';
import { IPagination } from '../interfaces/pagination.interface.ts';
import { IProduct } from '../interfaces/product.interface.ts';

export class ProductService {
	static async getProducts(pagination?: IPagination) {
		if (!pagination) {
			const res = await axios.get<IProductsResponse>(URL_API_PRODUCTS);
			store.dispatch(setProducts(res.data.data));
			return;
		}
		const params = new URLSearchParams();
		if (pagination.offset !== undefined) {
			params.append('offset', pagination.offset.toString());
		}
		if (pagination.limit !== undefined) {
			params.append('limit', pagination.limit.toString());
		}
		if (pagination.category) {
			params.append('category', pagination.category);
		}
		if (pagination.order) {
			params.append('order', pagination.order);
		}
		const query = `${URL_API_PRODUCTS}/?${params.toString()}`;
		const res = await axios.get<IProductsResponse>(query);
		store.dispatch(setProducts(res.data.data));
	}

	static async updateProduct(
		product: Pick<IProduct, 'id'> & Partial<Omit<IProduct, 'id'>>,
	) {
		const newUpdateProduct = await axios.put(URL_API_PRODUCTS, {
			id: product.id,
			price: product.price ?? undefined,
		});
		store.dispatch(updateProduct(newUpdateProduct.data));
	}
}
