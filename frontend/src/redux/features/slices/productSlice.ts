import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@interfaces';

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
	products: IProduct[];
	productEdit: ProductEdit[];
}

const initialState: IState = {
	products: [],
	productEdit: [],
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
		setPriceProduct: (state, action: PayloadAction<ProductEdit[]>) => {
			state.productEdit = [...action.payload];
		},
		setPriceEdit: (state, action: PayloadAction<{ id: string; isEdit: boolean }>) => {
			const index = state.productEdit.findIndex(
				(val) => val.price?.id === action.payload.id,
			);
			if (index !== -1) {
				const currentPrice = state.productEdit[index].price;
				if (currentPrice) {
					// Обновляем только поле isEdit
					state.productEdit[index].price = {
						...currentPrice,
						isEdit: action.payload.isEdit,
					};
				}
			}
		},
		savePriceEdit: (state, action: PayloadAction<{ id: string; price: number }>) => {
			const index = state.productEdit.findIndex(
				(val) => val.price?.id === action.payload.id,
			);
			if (index !== -1) {
				state.productEdit[index].price = {
					isEdit: false,
					price: action.payload.price,
					id: action.payload.id,
				};
			}
		},
	},
});

export const {
	setProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	setPriceProduct,
	setPriceEdit,
	savePriceEdit,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
