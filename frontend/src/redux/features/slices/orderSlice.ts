import { ITransaction, Status } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	order: ITransaction[];
}

const initialState: IState = { order: [] };

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: PayloadAction<ITransaction[]>) => {
			state.order = [...action.payload];
		},
		addOrder: (state, action: PayloadAction<ITransaction>) => {
			state.order = [action.payload, ...state.order];
		},
		deleteOrder: (state, action: PayloadAction<string>) => {
			const neworder: ITransaction[] = [...state.order].filter(
				(val) => val.id !== action.payload,
			);
			state.order = [...neworder];
		},
		updateOrderStatus: (
			state,
			action: PayloadAction<{ id: string; status: Status }>,
		) => {
			const orderArr = [...state.order];
			const index = orderArr.findIndex((val) => val.id === action.payload.id);
			orderArr[index].status = action.payload.status;
			state.order = [...orderArr];
		},
		updatePaymentStatus: (
			state,
			action: PayloadAction<{ id: string; status: string }>,
		) => {
			const orderArr = [...state.order];
			const index = orderArr.findIndex((val) => val.id === action.payload.id);
			orderArr[index].payment_status = action.payload.status;
			state.order = [...orderArr];
		},
	},
});

export const { deleteOrder, addOrder, setOrder, updateOrderStatus, updatePaymentStatus } =
	orderSlice.actions;
export const orderReducer = orderSlice.reducer;
