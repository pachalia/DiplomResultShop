import { ITransaction } from '../interfaces/transaction.interface.ts';

export const transaction: ITransaction[] = [
	{ status: 'PENDING', value: 'В ожидание' },
	{ status: 'PROCESSING', value: 'Обработка' },
	{ status: 'DELIVIRED', value: 'Доставлено' },
	{ status: 'SHIPPED', value: 'Отправлено' },
	{ status: 'CANCELLED', value: 'Отмена' },
];
