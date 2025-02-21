import axios, { AxiosError } from 'axios';
import { URL_API_ORDER } from '@constans';
import { IOrder, IOrderItem, ITransaction, Payment, Status } from '@interfaces';

interface Address {
	email: string;
	city: string;
	street: string;
	state: string;
	phone: string;
}
interface OrderInfo {
	name: string;
	price_product: number;
	quantity: number;
	quantity_stock: number;
}

export interface OrderInfoResponse {
	address: Address;
	data: OrderInfo[];
	payment: Payment;
}

export class OrderService {
	static async createOrder(id: string) {
		return await axios.post<IOrder>(URL_API_ORDER, { id }).then((res) => res.data);
	}

	static async createOrderItem(order: {
		orderId: string;
		productId: string;
		price: string;
		quantity: string;
	}) {
		return await axios
			.post<IOrderItem>(`${URL_API_ORDER}/order-item`, { ...order })
			.then((res) => res.data)
			.catch((e: AxiosError) => console.log(e.message));
	}

	static async getOrders() {
		return await axios.get<ITransaction[]>(URL_API_ORDER).then((res) => res.data);
	}

	static async updateOrderStatus(id: string, status: string) {
		return await axios
			.put<{ id: string; status: Status }>(URL_API_ORDER, { id, status })
			.then((res) => res.data);
	}

	static async getOrderInfo(id: string) {
		return await axios
			.get<OrderInfoResponse>(`${URL_API_ORDER}/order-item/${id}`)
			.then((res) => res.data);
	}
}
