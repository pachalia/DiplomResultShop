import axios from 'axios';
import { URL_API_CART } from '@constans';
import { ICart } from '@interfaces';
import { addProductToCart, setCart, store } from '@redux';
import { Message } from './message.service.ts';

export class CartService {
	static async getCart() {
		const cart: ICart[] = await axios
			.get<ICart[]>(URL_API_CART)
			.then((res) => res.data);
		cart.length && store.dispatch(setCart(cart));
	}

	static async addProductToCart(productId: string, quantity: string) {
		const cart = await axios
			.post<ICart>(URL_API_CART, {
				productId,
				quantity,
			})
			.then((res) => {
				if (res.data.id) {
					Message.success('Продукт добавлен в корзину');
					return res.data;
				}
			});
		cart && store.dispatch(addProductToCart(cart));
	}

	static async deleteProductToCart(id: string): Promise<boolean> {
		return await axios.delete(`${URL_API_CART}/${id}`).then(() => {
			return true;
		});
	}

	static async clearCart() {
		return await axios.delete(URL_API_CART).then(() => store.dispatch(setCart([])));
	}
}
