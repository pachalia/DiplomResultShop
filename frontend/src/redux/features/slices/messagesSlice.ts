import { IMessage } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
	message: IMessage | null;
	loginMessage: string | null;
	registerMessage: string | null;
}

const initialState: IState = {
	loginMessage: null,
	registerMessage: null,
	message: { message: null, type: null },
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setLoginMessage: (state, action: PayloadAction<string | null>) => {
			state.loginMessage = action.payload;
		},
		setRegisterMessage: (state, action: PayloadAction<string | null>) => {
			state.registerMessage = action.payload;
		},
		setMessage: (state, action: PayloadAction<IMessage | null>) => {
			state.message = action.payload;
		},
	},
});

export const { setLoginMessage, setRegisterMessage, setMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
