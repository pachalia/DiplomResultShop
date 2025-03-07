import { OrderTableForManager } from './OrdersTableForManager/orderTableForManager.tsx';
import { FindOrdersFormData } from '@inputs';
import { FindOrderForm } from '../../../components/manager/FindOrdersForm/findOrderForm.tsx';
import { Pagination, Spinner } from '@components';
import { useEffect, useState } from 'react';
import { setOrder, useAppDispatch } from '@redux';
import { OrderService } from '@services';

const LIMIT = 4;

export const Orders = () => {
	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });
	const [isFindOrder, setIsFindOrder] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [totalPages, setTotalPages] = useState<number>(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchOrders = async () => {
			const offset = (pagination.currentPage - 1) * LIMIT;
			let res;

			if (!isFindOrder) {
				res = await OrderService.getOrders({
					offset,
					limit: LIMIT,
					order: 'desc',
				});
			} else {
				res = await OrderService.getOrders({
					offset,
					limit: LIMIT,
					order: 'desc',
					email,
				});
			}

			setTotalPages(Math.ceil(res.total / LIMIT));
			dispatch(setOrder(res));
			setPagination((prev) => ({ ...prev, loading: false }));
		};

		fetchOrders();
	}, [pagination.currentPage, isFindOrder, email]); // Добавили email в зависимости

	const onSubmit = (data: FindOrdersFormData) => {
		if (data.email || data.status) {
			setIsFindOrder(true);
			setEmail(data.email);
			setPagination({ currentPage: 1, loading: true }); // Обновляем пагинацию
		} else {
			setIsFindOrder(false);
		}
	};

	return (
		<div className={'w-full relative'} style={{ top: '20%' }}>
			<h1 className={'text-center text-2xl text-black font-bold mb-5'}>
				Список заказов пользователей
			</h1>
			<FindOrderForm onSubmit={onSubmit} />
			<OrderTableForManager />
			{!pagination.loading ? (
				<>
					{totalPages > 1 && (
						<Pagination
							setPagination={setPagination}
							pagination={pagination}
							totalPages={totalPages}
						/>
					)}
				</>
			) : (
				<div className={'flex justify-center'}>
					<Spinner />
				</div>
			)}
		</div>
	);
};
