import { useEffect, useState } from 'react';
import { OrderService } from '@services';
import { OrderTableForManagerLayout } from './orderTableFormanagerLayout.tsx';
import { setOrder, updateOrderStatus, useAppDispatch, useAppSelector } from '@redux';
import { Status } from '@interfaces';

const lineTable: string[] = [
	'№',
	'Заказ',
	'Статус',
	'email',
	'Дата создания',
	'Цена',
	'payment status',
	'Удалить',
];

export const OrderTableForManager = () => {
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; status: Status };
	}>({});

	const dispatch = useAppDispatch();

	// const [orders, setOrders] = useState<ITransaction[]>([]);

	const clickHandler = (id: string, status: Status) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, status },
		}));
	};
	useEffect(() => {
		OrderService.getOrders().then((res) => dispatch(setOrder(res)));
	}, [dispatch]);
	const { order } = useAppSelector((state) => state.order);

	const handleSaveStatus = (id: string) => {
		OrderService.updateOrderStatus(id, editStates[id].status).then((res) => {
			dispatch(updateOrderStatus({ id: res.id, status: res.status }));
		});

		// ProductService.updateProduct({ id, status: editStates[id].status });
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: false, status: prev[id].status },
		}));
	};

	return (
		<>
			{order.length ? (
				<OrderTableForManagerLayout
					lineTable={lineTable}
					orders={order}
					clickHandler={clickHandler}
					handleSaveStatus={handleSaveStatus}
					editStates={editStates}
					setEditStates={setEditStates}
				/>
			) : (
				<div></div>
			)}
		</>
	);
};
