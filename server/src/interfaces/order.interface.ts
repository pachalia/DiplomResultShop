import { OrderStatus } from '@prisma/client';

interface Product {
	id: string;
	name: string;
	quantity: number;
	price: number;
}
export interface IOrder {
	id: number;
	status: OrderStatus;
	created_at: Date;
	user_email: string;
	product: Product;
	payment: string;
}
