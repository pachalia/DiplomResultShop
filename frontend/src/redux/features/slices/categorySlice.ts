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
	},
});

export const { setCategories, addCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
