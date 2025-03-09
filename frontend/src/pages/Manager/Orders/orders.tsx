import { OrderTableForManager } from '../../../components/manager/OrdersTableForManager/orderTableForManager.tsx';
import { FindOrdersFormData } from '@inputs';
import { FindOrderForm } from '../../../components/manager/FindOrdersForm/findOrderForm.tsx';
import { Pagination, Spinner } from '@components';
import { useEffect, useState } from 'react';
import { setOrder, useAppDispatch, useAppSelector } from '@redux';
import { Message, OrderService } from '@services';
import { Status } from '@interfaces';
import { AxiosError } from 'axios';

const LIMIT = 4;

export const Orders = () => {
	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });
	const [isFindOrder, setIsFindOrder] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [status, setStatus] = useState<Status | undefined>(undefined);
	const [totalPages, setTotalPages] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { transaction } = useAppSelector((state) => state.order);

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
					status,
				}).catch((e: AxiosError) => {
					Message.danger(e.message);
					return { ...transaction, data: [], total: 0 };
				});
			}

			setTotalPages(Math.ceil(res.total / LIMIT));
			dispatch(setOrder(res));
			setPagination((prev) => ({ ...prev, loading: false }));
		};

		fetchOrders();
	}, [pagination.currentPage, isFindOrder, email, status]); // Добавили email в зависимости

	const onSubmit = (data: FindOrdersFormData) => {
		if (data.email || data.status) {
			setIsFindOrder(true);
			setEmail(data.email);
			setStatus(data.status);
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
			{!pagination.loading ? (
				<OrderTableForManager />
			) : (
				<div className={'flex justify-center'}>
					<Spinner />
				</div>
			)}
			{!pagination.loading && totalPages > 1 ? (
				<Pagination
					totalPages={totalPages}
					pagination={pagination}
					setPagination={setPagination}
				/>
			) : (
				''
			)}
		</div>
	);
};
