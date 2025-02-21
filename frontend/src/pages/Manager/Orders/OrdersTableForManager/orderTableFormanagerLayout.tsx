import { OrderTableForManagerLayoutCell } from './orderTableForManagerLayoutCell.tsx';
import { Status } from '@interfaces';

interface EditState {
	isEditing: boolean;
	status: Status;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
export interface Order {
	id: string;
	status: Status;
	created_at: string;
	user_email: string;
	amount: string;
	payment_status: string;
}
interface IProductTableForAdminLayout {
	lineTable: string[];
	orders: Order[];
	clickHandler: (id: string, status: Status) => void;
	handleSaveStatus: (id: string) => void;
	editStates: EditStates;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
}
export const OrderTableForManagerLayout: React.FC<IProductTableForAdminLayout> = ({
	orders,
	handleSaveStatus,
	lineTable,
	clickHandler,
	editStates,
	setEditStates,
}) => {
	return (
		<div className={'w-full flex items-center flex-col'}>
			<table
				style={{
					width: '90%',
					margin: '0 auto',
					marginBottom: 40,
					position: 'relative',
					top: '30%',
				}}
			>
				<thead>
					<tr>
						{lineTable.map((val, i) => (
							<th
								style={{
									border: '1px solid black',
									width: i === 2 || i === 4 ? '15%' : 'inherit',
								}}
								key={i}
							>
								{val}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orders.map((val, i) => {
						const editState = editStates[val.id] || {
							isEditing: false,
							status: val.status,
						};
						return (
							<OrderTableForManagerLayoutCell
								key={val.id}
								value={val}
								index={i}
								editState={editState}
								setEditStates={setEditStates}
								handleSaveStatus={handleSaveStatus}
								clickHandler={clickHandler}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
