import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	categories: string[];
}
const initialState: IState = { categories: [] };

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<string[]>) => {
			state.categories = [...action.payload];
		},
		addCategory: (state, action: PayloadAction<string>) => {
			state.categories = [...state.categories, action.payload];
		},
		deleteCategory: (state, action: PayloadAction<string>) => {
			let categoriesArr = [...state.categories];
			categoriesArr = categoriesArr.filter((val) => val !== action.payload);
			state.categories = [...categoriesArr];
		},
		updateCategory: (
			state,
			action: PayloadAction<{ id: string; category: string }>,
		) => {
			const categoriesArr = [...state.categories];
			const index = categoriesArr.findIndex((val) => val === action.payload.id);
			categoriesArr[index] = action.payload.category;
			state.categories = [...categoriesArr];
		},
	},
});

export const { setCategories, addCategory, deleteCategory, updateCategory } =
	categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
