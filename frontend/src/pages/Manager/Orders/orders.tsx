import { OrderTableForManager } from './OrdersTableForManager/orderTableForManager.tsx';
import { useForm } from 'react-hook-form';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { FindOrdersFieldConfig, FindOrdersFormData } from '@inputs';
import { setOrder, useAppDispatch } from '@redux';
import { Button } from '@components';
import { OrderService } from '@services';
import { orderStatus } from '@utils';
import { Status } from '@interfaces';

const status = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVIRED', 'CANCELLED'];

export const Orders = () => {
	const formMethods = useForm<FindOrdersFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, FindOrdersFieldConfig);
	const dispatch = useAppDispatch();
	const onSubmit = (data: FindOrdersFormData) => {
		OrderService.getOrders('0', '4', 'desc', data.status, data.email).then((res) =>
			dispatch(setOrder(res)),
		);
	};
	return (
		<div className={'w-full relative'} style={{ top: '20%' }}>
			<h1 className={'text-center text-2xl text-black font-bold mb-5'}>
				Список заказов пользователей
			</h1>
			<div className={'w-5/12 m-auto'}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
					{controllers.map(({ field }, index) => (
						<label
							key={index}
							className={
								'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-5/12 mr-4'
							}
						>
							{field.name === 'status' && 'Статус для поиска:'}
							{field.name === 'email' && 'email для поиска:'}
							{field.name === 'email' ? (
								<input {...field} />
							) : (
								<select
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									onBlur={field.onBlur}
								>
									<option value={''}>{''}</option>
									{status.map((val) => (
										<option key={val} value={val}>
											{orderStatus(val as Status)}
										</option>
									))}
								</select>
							)}
						</label>
					))}
					<Button title={'Найти'} type={'submit'} />
				</form>
			</div>
			<OrderTableForManager />
		</div>
	);
};
