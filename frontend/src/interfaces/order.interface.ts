export type Status = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVIRED' | 'CANCELLED';
export interface IOrder {
	id: string;
	status: Status;
	createdAt: string;
}

export interface IOrderItem {
	orderId: string;
	productId: string;
	quantity: number;
	price: number;
}

export interface ITransaction {
	id: string;
	status: Status;
	created_at: string;
	user_email: string;
	amount: string;
	payment_status: string;
}
