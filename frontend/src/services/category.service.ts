import axios from 'axios';
import { URL_API_CATEGORIES } from '../constans/url.constans.ts';
import { store } from '../redux/store.ts';
import { addCategory, setCategories } from '../redux/features/slices/categorySlice.ts';
import { PaginationResponse } from '../responses/pagination.response.ts';
import { ICategory } from '../interfaces/category.interface.ts';

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
}
