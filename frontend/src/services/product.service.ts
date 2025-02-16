import axios, { AxiosError } from 'axios';
import { URL_API_PRODUCTS } from '../constans/url.constans.ts';
import { deleteProduct, setProducts, updateProduct, store } from '@redux';
import { IProductsResponse } from '../responses/products.response.ts';
import { ICategoryPagination, IProduct } from '@interfaces';
import { AddProductFormData } from '@inputs';
import { Message } from './message.service.ts';

export class ProductService {
	static async getProducts(pagination?: ICategoryPagination) {
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
	static async deleteProducts(id: string) {
		const deleteProducts = await axios.delete<IProduct>(`${URL_API_PRODUCTS}/${id}`);
		deleteProducts.data.id && store.dispatch(deleteProduct(deleteProducts.data.id));
	}

	static async addProduct(data: AddProductFormData) {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('price', data.price.toString());
		formData.append('quantity', data.quantity.toString());
		formData.append('category', data.category);
		formData.append('image', data.image as Blob);
		return await axios
			.post<IProduct>(URL_API_PRODUCTS, formData)
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return null;
			});
	}

	static async getProductById(id: string): Promise<IProduct> {
		return await axios
			.get<IProduct>(`${URL_API_PRODUCTS}/${id}`)
			.then((res) => res.data);
	}
}
