import { IPaginationData, Status } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
	id: string;
	name: string;
	quantity: number;
	price: number;
}
export interface IOrderRedux {
	id: string;
	user_email: string;
	status: Status;
	product: Product;
	payment: string;
	created_at: string;
}
interface IState {
	transaction: IPaginationData<IOrderRedux[]>;
}

const initialState: IState = {
	transaction: {
		data: [],
		limit: 0,
		total: 0,
		offset: 0,
		order: 'desc',
	},
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: PayloadAction<IPaginationData<IOrderRedux[]>>) => {
			state.transaction = action.payload;
		},
		addOrder: (state, action: PayloadAction<IOrderRedux>) => {
			state.transaction.total =
				state.transaction.total && state.transaction.total++;
			state.transaction.data = [action.payload, ...state.transaction.data];
		},
		deleteOrder: (state, action: PayloadAction<string>) => {
			const neworder: IOrderRedux[] = [...state.transaction.data].filter(
				(val) => val.id !== action.payload,
			);
			state.transaction.total =
				state.transaction.total && state.transaction.total--;
			state.transaction.data = [...neworder];
		},
		updateOrderStatus: (
			state,
			action: PayloadAction<{ id: string; status: Status }>,
		) => {
			const orderArr = [...state.transaction.data];
			const index = orderArr.findIndex((val) => val.id === action.payload.id);
			orderArr[index].status = action.payload.status;
			state.transaction.data = [...orderArr];
		},
	},
});

export const { deleteOrder, addOrder, setOrder, updateOrderStatus } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
