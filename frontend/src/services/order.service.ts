import axios, { AxiosError } from 'axios';
import { URL_API_ORDER, URL_API_PAYMENT } from '@constans';
import {
	IOrder,
	IOrderItem,
	IOrderPagination,
	IPaginationData,
	Payment,
	Status,
} from '@interfaces';
import { IOrderRedux } from '@redux';

interface Address {
	city: string;
	state: string;
	street: string;
	zipCode: string;
	phone: string;
}
interface OrderItemInfo {
	orderId: string;
	product: {
		id: string;
		name: string;
		quantity: number;
		quantity_stock: number;
		price: number;
		image: string;
	};
}

export interface PaymentInfoResponse {
	email: string;
	address: Address;
	orderItem: OrderItemInfo[];
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

	static async getOrders(
		order?: IOrderPagination,
	): Promise<IPaginationData<IOrderRedux[]>> {
		const params = new URLSearchParams();
		if (order?.actual_order) {
			params.append('actual_order', order.actual_order);
			return await axios
				.get<
					IPaginationData<IOrderRedux[]>
				>(`${URL_API_ORDER}/current-user/?${params}`)
				.then((res) => res.data);
		} else {
			order?.offset && params.append('offset', order.offset.toString());
			order?.limit && params.append('limit', order.limit.toString());
			order?.order && params.append('order', order.order);
			order?.status && params.append('status', order.status);
			order?.email && params.append('email', order.email);
			return await axios
				.get<IPaginationData<IOrderRedux[]>>(`${URL_API_ORDER}/?${params}`)
				.then((res) => res.data);
		}
	}

	static async updateOrderStatus(id: string, status: string) {
		return await axios
			.put<{ id: string; status: Status }>(URL_API_ORDER, { id, status })
			.then((res) => res.data);
	}

	static async getPaymentInfo(id: string) {
		return await axios
			.get<PaymentInfoResponse>(`${URL_API_PAYMENT}/${id}`)
			.then((res) => res.data);
	}

	static async deleteOrder(id: string) {
		return await axios
			.delete<{
				id: string;
				userId: string;
				status: string;
				createdAt: string;
			}>(`${URL_API_ORDER}/${id}`)
			.then((res) => res.data);
	}
}
