import { useState } from 'react';
import { OrderService } from '@services';
import { OrderTableForManagerLayout } from './orderTableFormanagerLayout.tsx';
import { updateOrderStatus, useAppDispatch } from '@redux';
import { Status } from '@interfaces';

const lineTable: string[] = [
	'№',
	'Email',
	'Статус',
	'Дата создания',
	'Продукт',
	'Количество',
	'Цена за продукт',
	'Стоимость заказа',
	'Авторизация платежа',
];

export const OrderTableForManager = () => {
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; status: Status };
	}>({});

	const dispatch = useAppDispatch();

	const clickHandler = (id: string, status: Status) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, status },
		}));
	};

	const handleSaveStatus = (id: string) => {
		OrderService.updateOrderStatus(id, editStates[id].status).then((res) => {
			dispatch(updateOrderStatus({ id: res.id, status: res.status }));
		});
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: false, status: prev[id].status },
		}));
	};

	return (
		<>
			<OrderTableForManagerLayout
				lineTable={lineTable}
				clickHandler={clickHandler}
				handleSaveStatus={handleSaveStatus}
				editStates={editStates}
				setEditStates={setEditStates}
			/>
		</>
	);
};
