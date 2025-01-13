import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string | null;
	category_id: string;
}
type Role = 'ADMIN' | 'MANAGER' | 'CUSTOMER';
export interface User {
	id: string;
	email: string;
	role: Role;
	cart_id: string;
}

export interface Cart {
	id: string;
	quantity: number;
	product_id: string;
	product_name: string;
	product_description: string;
	product_price: number;
	product_stock_quantity: number;
}
export interface IState {
	products: IProduct[];
	current_user: User | null;
	cart: Cart[];
	categories: string[];
}

const initialState: IState = {
	products: [],
	current_user: null,
	cart: [],
	categories: [],
};

export const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = [...action.payload];
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.current_user = action.payload;
		},
		setCart: (state, action: PayloadAction<Cart[]>) => {
			state.cart = [...action.payload];
		},
		setCategories: (state, action: PayloadAction<string[]>) => {
			state.categories = [...action.payload];
		},
		addCategory: (state, action: PayloadAction<string>) => {
			state.categories = [...state.categories, action.payload];
		},
		addProduct: (state, action: PayloadAction<IProduct>) => {
			state.products = [...state.products, action.payload];
		},
	},
});

export const { setProducts, setUser, setCart, setCategories, addProduct, addCategory } =
	shopSlice.actions;

export const shopReducer = shopSlice.reducer;
