import { IPaginationData, IUser } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	current_user: IUser | null;
	users_list: IPaginationData<IUser[]>;
}

const initialState: IState = { current_user: null, users_list: { data: [], total: 0 } };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.current_user = action.payload;
		},
		setUsersList: (state, action: PayloadAction<IPaginationData<IUser[]>>) => {
			state.users_list = action.payload;
		},
		deleteUser: (state, action: PayloadAction<{ id: string }>) => {
			let newArr = [...state.users_list!.data];
			newArr = newArr.filter((val) => val.id !== action.payload.id);
			state.users_list!.data = [...newArr];
			state.users_list!.total = state.users_list!.total--;
		},
	},
});

export const { setUser, setUsersList, deleteUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
