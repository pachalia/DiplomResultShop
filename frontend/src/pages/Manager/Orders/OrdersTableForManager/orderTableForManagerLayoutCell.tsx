import { Order } from './orderTableFormanagerLayout.tsx';
import { Button } from '@components';
import { transaction } from '@constans';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../../../../components/modal/modal.tsx';
import { PaymentService } from '@services';
import { Status } from '@interfaces';
import { updatePaymentStatus, useAppDispatch } from '@redux';

interface EditState {
	isEditing: boolean;
	status: Status;
}

interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}

interface OrderTableForManagerLayoutCellProps {
	value: Order;
	index: number;
	editState: EditState;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
	clickHandler?: (id: string, status: Status) => void;
	handleSaveStatus: (id: string) => void;
}

export const OrderTableForManagerLayoutCell: React.FC<
	OrderTableForManagerLayoutCellProps
> = ({ value, index, editState, setEditStates, handleSaveStatus }) => {
	const handleEditClick = (id: string, status: Status) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, status },
		}));
	};
	const [modal, setModal] = useState<{
		paymentId: string;
		amount?: string;
		isModal: boolean;
	} | null>(null);
	const dispatch = useAppDispatch();

	const capturePayment = () => {
		const _capturePayment = async (paymentId: string, amount?: string) => {
			const payment =
				modal?.paymentId &&
				(await PaymentService.captureOrCancelPayment(paymentId, amount));
			payment &&
				dispatch(updatePaymentStatus({ id: payment.id, status: payment.status }));
		};
		modal?.paymentId &&
			modal.amount &&
			_capturePayment(modal?.paymentId, modal?.amount);
		modal?.paymentId && !modal.amount && _capturePayment(modal.paymentId);
	};
	return (
		<>
			{modal?.isModal && (
				<div>
					<Modal
						message={
							modal.amount
								? 'Вы хотите принять платёж?'
								: 'Вы хотите отменить платёж?'
						}
						callback={capturePayment}
						setModal={setModal}
					/>
				</div>
			)}
			<tr className={'border border-solid border-gray-500'}>
				<td className={'border border-solid border-gray-500 text-center'}>
					{index + 1}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					<NavLink to={`/manager/order/${value.id}`}>Заказ</NavLink>
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.isEditing && transaction.length ? (
						<div>
							<select
								value={editState.status}
								onChange={(e) => {
									setEditStates((prev) => ({
										...prev,
										[value.id]: {
											...prev[value.id],
											status: e.target.value as Status,
										},
									}));
								}}
							>
								{transaction.map((order) => (
									<option key={order.status} value={order.status}>
										{order.value}
									</option>
								))}
							</select>
							<div className={'flex justify-between'}>
								<Button
									onClick={() => handleSaveStatus(value.id)}
									title={'Сохранить'}
								/>

								<Button
									onClick={() => {
										setEditStates((prev) => ({
											...prev,
											[value.id]: {
												...prev[value.id],
												isEditing: false,
											},
										}));
									}}
									title={'Отмена'}
								/>
							</div>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{value.status === 'PENDING'
								? 'В ожидание'
								: value.status === 'PROCESSING'
									? 'Обработка'
									: value.status === 'SHIPPED'
										? 'Отправлено'
										: value.status === 'DELIVIRED'
											? 'Доставлено'
											: 'Отмена'}
							<Button
								onClick={() => handleEditClick(value.id, value.status)}
								title={'Ред.'}
							/>
						</div>
					)}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.user_email}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{new Date(value.created_at).toLocaleDateString()}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.amount}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.payment_status}
				</td>
				<td className={'border border-solid border-gray-500'}>
					{value.payment_status === 'waiting_for_capture' ? (
						<div className={'flex justify-between'}>
							<Button
								onClick={() => {
									setModal({
										paymentId: value.id,
										amount: value.amount,
										isModal: true,
									});
								}}
								title={'Принять'}
							/>
							<Button
								onClick={() => {
									setModal({
										paymentId: value.id,
										isModal: true,
									});
								}}
								title={'Отменить'}
							/>
						</div>
					) : (
						''
					)}
				</td>
			</tr>
		</>
	);
};
