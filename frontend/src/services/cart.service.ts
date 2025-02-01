import axios from 'axios';
import { URL_API_CART } from '../constans/url.constans.ts';
import { store } from '../redux/store.ts';
import { ICart } from '../interfaces/cart.interface.ts';
import { addProductToCart, setCart } from '../redux/features/slices/cartSlice.ts';

export class CartService {
	static async getCart() {
		const cart: ICart[] = await axios
			.get<ICart[]>(URL_API_CART)
			.then((res) => res.data);
		cart.length && store.dispatch(setCart(cart));
	}

	static async addProductToCart(productId: string, quantity: number) {
		const cart = await axios
			.post<ICart>(URL_API_CART, {
				productId,
				quantity,
			})
			.then((res) => res.data);
		cart && store.dispatch(addProductToCart(cart));
	}
}
