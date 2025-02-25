import { Status } from '@interfaces';

export const orderStatus = (status: Status) => {
	switch (status) {
		case 'PENDING':
			return 'В ожидание';
		case 'PROCESSING':
			return 'Обработка';
		case 'DELIVIRED':
			return 'Доставлено';
		case 'SHIPPED':
			return 'Отправлено';
		case 'CANCELLED':
			return 'Отмена';
	}
};
