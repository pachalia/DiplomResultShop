import axios, { AxiosError } from 'axios';
import { URL_API_PRODUCTS } from '@constans';
import { deleteProduct, setProducts, store, updateProduct } from '@redux';
import { IProduct, IProductPagination, IProductPaginationData } from '@interfaces';
import { AddProductFormData } from '@inputs';
import { Message } from './message.service.ts';

export class ProductService {
	static async getProducts(pagination?: IProductPagination) {
		if (!pagination) {
			const res = await axios.get<IProductPaginationData>(URL_API_PRODUCTS);
			store.dispatch(setProducts(res.data));
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
		if (pagination.product) {
			params.append('product', pagination.product);
		}
		const query = `${URL_API_PRODUCTS}/?${params.toString()}`;
		return await axios.get<IProductPaginationData>(query).then((res) => res.data);
	}

	static async updateProduct(
		product: Pick<IProduct, 'id'> & Partial<Omit<IProduct, 'id'>>,
	) {
		const newUpdateProduct = await axios.put(URL_API_PRODUCTS, {
			id: product.id,
			price: product.price ?? undefined,
			quantity: product.quantity ?? undefined,
			category_id: product.category_id ?? undefined,
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
