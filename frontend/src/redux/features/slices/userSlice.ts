import { IUser } from '../../../interfaces/user.interface.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	current_user: IUser | null;
}

const initialState: IState = { current_user: null };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.current_user = action.payload;
		},
		deleteUser: (state) => {
			state.current_user = null;
		},
	},
});

export const { deleteUser, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
