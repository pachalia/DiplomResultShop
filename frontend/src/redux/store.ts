import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './features/slices/productSlice.ts';
import { categoryReducer } from './features/slices/categorySlice.ts';
import { userReducer } from './features/slices/userSlice.ts';
import { cartReducer } from './features/slices/cartSlice.ts';

export const store = configureStore({
	reducer: {
		product: productReducer,
		category: categoryReducer,
		user: userReducer,
		cart: cartReducer,
	},
	devTools: true,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
