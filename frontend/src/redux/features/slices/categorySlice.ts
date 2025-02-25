import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationResponse } from '../../../responses/pagination.response.ts';
import { ICategory } from '@interfaces';

interface IState {
	categories: PaginationResponse<ICategory[]> | null;
}
const initialState: IState = { categories: null };

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategories: (
			state,
			action: PayloadAction<PaginationResponse<ICategory[]>>,
		) => {
			state.categories = action.payload;
		},
		addCategory: (state, action: PayloadAction<{ name: string }>) => {
			state.categories!.data = [...state.categories!.data, action.payload];
		},
		deleteCategory: (state, action: PayloadAction<string>) => {
			let categoriesArr = [...state.categories!.data];
			categoriesArr = categoriesArr.filter((val) => val.name !== action.payload);
			state.categories!.data = [...categoriesArr];
		},
		updateCategory: (
			state,
			action: PayloadAction<{ id: string; category: string }>,
		) => {
			const categoriesArr = [...state.categories!.data];
			const index = categoriesArr.findIndex(
				(val) => val.name === action.payload.id,
			);
			categoriesArr[index].name = action.payload.category;
			state.categories!.data = [...categoriesArr];
		},
	},
});

export const { setCategories, addCategory, deleteCategory, updateCategory } =
	categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
