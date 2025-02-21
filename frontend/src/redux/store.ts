import { configureStore } from '@reduxjs/toolkit';
import {
	productReducer,
	messageReducer,
	cartReducer,
	userReducer,
	categoryReducer,
	orderReducer,
} from './features';

export const store = configureStore({
	reducer: {
		product: productReducer,
		category: categoryReducer,
		user: userReducer,
		cart: cartReducer,
		message: messageReducer,
		order: orderReducer,
	},
	devTools: true,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
