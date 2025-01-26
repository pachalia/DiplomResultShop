import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces/product.interface.ts';

export interface IState {
	products: IProduct[];
}

const initialState: IState = {
	products: [],
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = [...action.payload];
		},

		addProduct: (state, action: PayloadAction<IProduct>) => {
			state.products = [...state.products, action.payload];
		},
		updateProduct: (state, action: PayloadAction<IProduct>) => {
			const newState: IProduct[] = [...state.products];
			const index = newState.findIndex((val) => val.id === action.payload.id);
			newState[index] = action.payload;
			state.products = [...newState];
		},
	},
});

export const { setProducts, addProduct, updateProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;
