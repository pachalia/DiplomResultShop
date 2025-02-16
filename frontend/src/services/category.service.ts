import axios, { AxiosError } from 'axios';
import { URL_API, URL_API_CATEGORIES } from '../constans/url.constans.ts';
import {
	addCategory,
	deleteCategory,
	setCategories,
	updateCategory,
	store,
} from '@redux';
import { PaginationResponse } from '../responses/pagination.response.ts';
import { ICategory } from '@interfaces';
import { Message } from './message.service.ts';

export class CategoryService {
	static async getCategory() {
		const category =
			await axios.get<PaginationResponse<ICategory[]>>(URL_API_CATEGORIES);
		store.dispatch(setCategories(category.data.data.map((val) => val.name)));
	}

	static async addCategory(category: string) {
		const _category = await axios.post<{ name: string }>(URL_API_CATEGORIES, {
			name: category,
		});
		category && store.dispatch(addCategory(_category.data.name));
	}

	static async updateCategory(id: string, category: string) {
		axios
			.put<{ name: string }>(`${URL_API}/categories`, { id, category })
			.then((res) =>
				store.dispatch(updateCategory({ id, category: res.data.name })),
			)
			.catch((e: AxiosError) => Message.danger(e.message));
	}

	static deleteCategory(id: string) {
		axios
			.delete<{ name: string }>(`${URL_API}/categories/${id}`)
			.then((res) => store.dispatch(deleteCategory(res.data.name)))
			.catch((e: AxiosError) => Message.danger(e.message));
	}
}
