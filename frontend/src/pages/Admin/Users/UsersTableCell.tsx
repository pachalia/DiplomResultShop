import { Button } from '../../../components';
import { IUser } from '../../../interfaces/user.interface.ts';

interface EditState {
	isEditing: boolean;
	role: string;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
interface UsersTableCellProps {
	users: IUser[];
	roles: string[];
	editStates: EditStates;
	handleEditClick: (id: string, role: string) => void;
	handleRoleChange: (id: string, role: string) => void;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
	deleteUser: (id: string) => void;
}

export const UsersTableCell: React.FC<UsersTableCellProps> = ({
	users,
	roles,
	handleRoleChange,
	handleEditClick,
	editStates,
	setEditStates,
	deleteUser,
}) => {
	return (
		<tbody>
			{users.map((val, index) => {
				const editState = editStates[val.id] || {
					isEditing: false,
					role: val.role,
				};
				return (
					<tr key={val.id}>
						<td className={'border border-solid border-gray-500 text-center'}>
							{index + 1}
						</td>
						<td className={'border border-solid border-gray-500 text-center'}>
							{val.email}
						</td>
						<td className={'border border-solid border-gray-500 text-center'}>
							{editState.isEditing ? (
								<div>
									<select
										value={editState.role}
										onChange={(e) => {
											setEditStates((prev) => ({
												...prev,
												[val.id]: {
													...prev[val.id],
													role: e.target.value,
												},
											}));
										}}
									>
										{roles.map((role) => (
											<option key={role} value={role}>
												{role}
											</option>
										))}
									</select>
									<div>
										<button
											onClick={() =>
												handleRoleChange(val.id, editState.role)
											}
										>
											Сохранить
										</button>
										<button
											onClick={() => {
												setEditStates((prev) => ({
													...prev,
													[val.id]: {
														...prev[val.id],
														isEditing: false,
													},
												}));
											}}
										>
											Отмена
										</button>
									</div>
								</div>
							) : (
								<div className={'flex justify-between'}>
									{val.role}
									<Button
										onClick={() => handleEditClick(val.id, val.role)}
										title={'Редактировать'}
									/>
								</div>
							)}
						</td>
						<td className={'border border-solid border-gray-500 text-center'}>
							<button onClick={() => deleteUser(val.id)}>Удалить</button>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
