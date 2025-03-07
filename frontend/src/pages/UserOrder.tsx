import { useEffect, useState } from 'react';
import { OrderService } from '@services';
import { IPaginationData } from '@interfaces';
import { IOrderRedux } from '@redux';
import { orderStatus } from '@utils';

export const UserOrder = () => {
	const [isActualOrder, setIsActualOrder] = useState<boolean>(true);
	const [orders, setOrders] = useState<IPaginationData<IOrderRedux[]>>();
	useEffect(() => {
		isActualOrder
			? OrderService.getOrders({ actual_order: 'actual' }).then((res) => {
					setOrders(res);
				})
			: OrderService.getOrders({ actual_order: 'notActual' }).then((res) =>
					setOrders(res),
				);
	}, [isActualOrder]);
	return (
		<div className={'flex justify-center w-10/12 h-fit'}>
			<div className={'bg-white p-5 mb-6 w-10/12'}>
				<h2 className={'text-xl font-semibold mb-4 text-center'}>Заказы</h2>
				<div className={'flex text-xl font-bold justify-center'}>
					<div
						className={`pr-5 cursor-pointer ${isActualOrder ? 'text-red-700' : undefined}`}
						onClick={() => setIsActualOrder(true)}
					>
						Актуальные
					</div>
					<div
						className={
							!isActualOrder
								? 'text-red-700 cursor-pointer'
								: 'cursor-pointer'
						}
						onClick={() => setIsActualOrder(false)}
					>
						Завершённые
					</div>
				</div>
				{orders?.data.length
					? orders.data.map((val) => (
							<div className={'border border-solid border-black mb-3'}>
								<h2
									className={'text-center font-bold text-lg'}
								>{`Заказ № ${val.id} от ${new Date(val.created_at).toLocaleDateString()}`}</h2>
								<div>{`Товар: ${val.product.name}`}</div>
								<div>{`Цена: ${val.product.price}р.`}</div>
								<div>{`Количество: ${val.product.quantity}`}</div>
								<div>{`Стоимость заказа: ${val.product.price * val.product.quantity}р.`}</div>
								<div>{`Статус: ${orderStatus(val.status)}`}</div>
							</div>
						))
					: ''}
			</div>
		</div>
	);
};
