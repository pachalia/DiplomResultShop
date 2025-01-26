import axios from 'axios';
import { URL_API_CATEGORIES } from '../constans/url.constans.ts';
import { store } from '../redux/store.ts';
import { setCategories } from '../redux/features/slices/categorySlice.ts';

export class CategoryService {
	static async getCategory() {
		const category = await axios.get<{ name: string }[]>(URL_API_CATEGORIES);
		store.dispatch(setCategories(category.data.map((val) => val.name)));
	}

	// static async addCategory(category:string) {
	//
	// }
}
