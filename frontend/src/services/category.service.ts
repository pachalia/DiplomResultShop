import axios from 'axios';
import { URL_API, URL_API_CATEGORIES } from '@constans';
import { PaginationResponse } from '../responses/pagination.response.ts';
import { ICategory } from '@interfaces';

export class CategoryService {
	static async getCategory(
		offset: string = '0',
		limit: string = '4',
		order: 'asc' | 'desc' = 'desc',
	) {
		const params = new URLSearchParams();
		params.append('offset', offset);
		params.append('limit', limit);
		params.append('order', order);
		return await axios.get<PaginationResponse<ICategory[]>>(
			`${URL_API_CATEGORIES}/?${params}`,
		);
	}

	static async getUserCategory() {
		return await axios.get<PaginationResponse<ICategory[]>>(`${URL_API_CATEGORIES}`);
	}

	static async addCategory(category: string) {
		return await axios.post<{ name: string }>(URL_API_CATEGORIES, {
			name: category,
		});
	}

	static async updateCategory(id: string, category: string) {
		return await axios.put<{ name: string }>(`${URL_API}/categories`, {
			id,
			category,
		});
	}

	static deleteCategory(id: string) {
		return axios.delete<{ name: string }>(`${URL_API}/categories/${id}`);
	}

	static findCategory(category: string) {
		return axios
			.get<{ name: string }[]>(`${URL_API_CATEGORIES}/find/${category}`)
			.then((res) => res.data);
	}
}
