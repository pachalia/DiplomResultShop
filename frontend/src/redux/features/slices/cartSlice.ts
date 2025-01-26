import { ICart } from '../../../interfaces/cart.interface.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	cart: ICart[];
}

const initialState: IState = { cart: [] };

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<ICart[]>) => {
			state.cart = [...action.payload];
		},
		addProductToCart: (state, action: PayloadAction<ICart>) => {
			state.cart = [action.payload, ...state.cart];
		},
		deleteProductToCart: (state, action: PayloadAction<string>) => {
			const newCart: ICart[] = [...state.cart].filter(
				(val) => val.id !== action.payload,
			);
			state.cart = [...newCart];
		},
	},
});

export const { setCart, deleteProductToCart, addProductToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
