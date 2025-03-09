import { Button } from '@components';
import { transaction } from '@constans';
import { Status } from '@interfaces';
import { orderStatus } from '@utils';
import { NavLink } from 'react-router-dom';
import { IOrderRedux } from '@redux';

interface EditState {
	isEditing: boolean;
	status: Status;
}

interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}

interface OrderTableForManagerLayoutCellProps {
	value: IOrderRedux;
	index: number;
	editState: EditState;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
	clickHandler?: (id: string, status: Status) => void;
	handleSaveStatus: (id: string) => void;
}

export const OrderTableForManagerLayoutCell: React.FC<
	OrderTableForManagerLayoutCellProps
> = ({ value, editState, setEditStates, handleSaveStatus }) => {
	const handleEditClick = (id: string, status: Status) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, status },
		}));
	};

	return (
		<>
			<tr className={'border border-solid border-gray-500'}>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.id}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.user_email}
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
							<div>{orderStatus(value.status)}</div>
							<div>
								<Button
									onClick={() =>
										handleEditClick(value.id, value.status)
									}
									title={'Ред.'}
								/>
							</div>
						</div>
					)}
				</td>

				<td className={'border border-solid border-gray-500 text-center'}>
					{new Date(value.created_at).toLocaleDateString()}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					<NavLink to={`/product/${value.product.id}`}>
						{value.product.name}
					</NavLink>
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.product.quantity}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{`${value.product.price}р.`}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{`${value.product.quantity * value.product.price}р.`}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					<NavLink to={`/manager/payment/${value.payment}`}>
						Инфо о платеже
					</NavLink>
				</td>
			</tr>
		</>
	);
};
