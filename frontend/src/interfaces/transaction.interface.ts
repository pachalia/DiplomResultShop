import { StatusOrder } from '../types/status.order.ts';

export interface ITransaction {
	status: StatusOrder;
	value: string;
}
