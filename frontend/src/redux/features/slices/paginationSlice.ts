import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pagination {
	currentPage: number;
	totalPage: number;
	loading: boolean;
}

const initialState: Pagination = {
	currentPage: 1,
	totalPage: 0,
	loading: true,
};

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setTotalPage: (state, action: PayloadAction<number>) => {
			state.totalPage = action.payload;
		},
		setLoadingPage: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { setCurrentPage, setLoadingPage, setTotalPage } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
