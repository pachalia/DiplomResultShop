import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductPaginationData } from '@interfaces';

export interface ProductEdit {
	price?: {
		id: string;
		isEdit: boolean;
		price: number;
	};
	quantity?: {
		id: string;
		isEdit: boolean;
		quanttity: number;
	};
}
export interface IState {
	products: IProductPaginationData;
	findProducts: IProductPaginationData;
}
export const products: IProductPaginationData = {
	data: [],
	limit: 0,
	total: 0,
	order: 'desc',
	offset: 0,
};

const initialState: IState = {
	products: products,
	findProducts: products,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProductPaginationData>) => {
			state.products = action.payload;
		},

		addProduct: (state, action: PayloadAction<IProduct>) => {
			state.products.total = state.products.total++;
			state.products.data = [...state.products.data, action.payload];
		},
		updateProduct: (state, action: PayloadAction<IProduct>) => {
			const newState: IProduct[] = [...state.products.data];
			const index = newState.findIndex((val) => val.id === action.payload.id);
			newState[index] = action.payload;
			state.products.data = [...newState];
		},
		deleteProduct: (state, action: PayloadAction<string>) => {
			let newState: IProduct[] = [...state.products.data];
			newState = newState.filter((val) => val.id !== action.payload);
			state.products.data = [...newState];
		},
		setFindProducts: (state, action: PayloadAction<IProductPaginationData>) => {
			state.findProducts = action.payload;
		},
	},
});

export const { setProducts, addProduct, updateProduct, deleteProduct, setFindProducts } =
	productSlice.actions;

export const productReducer = productSlice.reducer;
