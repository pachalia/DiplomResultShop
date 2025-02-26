import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@interfaces';

interface ProductEdit {
	id: string;
	price: {
		isEdit: boolean;
		price: number;
	};
	quantity: {
		isEdit: boolean;
		quanttity: number;
	};
}
export interface IState {
	products: IProduct[];
	productEdit: ProductEdit;
}

const initialState: IState = {
	products: [],
	productEdit: {
		id: '',
		price: {
			isEdit: false,
			price: 0,
		},
		quantity: {
			isEdit: false,
			quanttity: 0,
		},
	},
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
		deleteProduct: (state, action: PayloadAction<string>) => {
			let newState: IProduct[] = [...state.products];
			newState = newState.filter((val) => val.id !== action.payload);
			state.products = [...newState];
		},
	},
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
	productSlice.actions;

export const productReducer = productSlice.reducer;
