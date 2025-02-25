import { ITransaction, Order, PaymentStatus, Status } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	transaction: ITransaction;
}

const initialState: IState = {
	transaction: {
		data: [],
		limit: undefined,
		ofset: undefined,
		total: undefined,
		order: undefined,
		status: undefined,
	},
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: PayloadAction<ITransaction>) => {
			state.transaction = action.payload;
		},
		addOrder: (state, action: PayloadAction<Order>) => {
			state.transaction.total =
				state.transaction.total && state.transaction.total++;
			state.transaction.data = [action.payload, ...state.transaction.data];
		},
		deleteOrder: (state, action: PayloadAction<string>) => {
			const neworder: Order[] = [...state.transaction.data].filter(
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
		updatePaymentStatus: (
			state,
			action: PayloadAction<{ id: string; status: PaymentStatus }>,
		) => {
			const orderArr = [...state.transaction.data];
			const index = orderArr.findIndex((val) => val.id === action.payload.id);
			orderArr[index].payment_status = action.payload.status;
			state.transaction.data = [...orderArr];
		},
	},
});

export const { deleteOrder, addOrder, setOrder, updateOrderStatus, updatePaymentStatus } =
	orderSlice.actions;
export const orderReducer = orderSlice.reducer;
