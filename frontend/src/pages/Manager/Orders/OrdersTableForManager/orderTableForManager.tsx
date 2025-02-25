import { useEffect, useState } from 'react';
import { OrderService } from '@services';
import { OrderTableForManagerLayout } from './orderTableFormanagerLayout.tsx';
import { setOrder, updateOrderStatus, useAppDispatch, useAppSelector } from '@redux';
import { Status } from '@interfaces';
import { Pagination, Spinner } from '@components';

const lineTable: string[] = [
	'№',
	'Заказ',
	'Статус',
	'email',
	'Дата создания',
	'Цена',
	'Payment status',
	'Авторизация платежа',
];
const LIMIT = 4;
export const OrderTableForManager = () => {
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; status: Status };
	}>({});
	const dispatch = useAppDispatch();
	const { transaction } = useAppSelector((state) => state.order);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);

	const clickHandler = (id: string, status: Status) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, status },
		}));
	};
	useEffect(() => {
		const offset = (currentPage - 1) * LIMIT;
		OrderService.getOrders(offset.toString(), LIMIT.toString(), 'desc').then(
			(res) => {
				setLoading(false);
				dispatch(setOrder(res));
			},
		);
	}, [dispatch, currentPage]);
	const handleSaveStatus = (id: string) => {
		OrderService.updateOrderStatus(id, editStates[id].status).then((res) => {
			dispatch(updateOrderStatus({ id: res.id, status: res.status }));
		});
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: false, status: prev[id].status },
		}));
	};
	const totalPages = transaction.total ? Math.ceil(transaction.total / LIMIT) : 0;

	return (
		<>
			{!loading ? (
				<>
					<OrderTableForManagerLayout
						lineTable={lineTable}
						clickHandler={clickHandler}
						handleSaveStatus={handleSaveStatus}
						editStates={editStates}
						setEditStates={setEditStates}
					/>
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage} // Обработчик изменения страницы
							load={setLoading}
						/>
					)}
				</>
			) : (
				<div className={'flex justify-center'}>
					<Spinner />
				</div>
			)}
		</>
	);
};
