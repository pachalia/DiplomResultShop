import axios from 'axios';
import { URL_API, URL_API_CATEGORIES } from '@constans';
import { PaginationResponse } from '../responses/pagination.response.ts';
import { ICategory } from '@interfaces';

export class CategoryService {
	static async getCategory(offset?: string, limit?: string, order?: 'asc' | 'desc') {
		const params = new URLSearchParams();
		offset && params.append('offset', offset);
		limit && params.append('limit', limit);
		order && params.append('order', order);
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
