import { OrderTableForManager } from './OrdersTableForManager/orderTableForManager.tsx';

export const Orders = () => {
	return (
		<div className={'w-full relative'} style={{ top: '20%' }}>
			<h1 className={'text-center text-2xl text-black font-bold mb-5'}>
				Список заказов пользователей
			</h1>
			<OrderTableForManager />
		</div>
	);
};
