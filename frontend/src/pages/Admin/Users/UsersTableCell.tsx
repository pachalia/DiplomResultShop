import { Button, Modal } from '@components';
import { useState } from 'react';
import { useAppSelector } from '@redux';

interface EditState {
	isEditing: boolean;
	role: string;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
interface UsersTableCellProps {
	roles: string[];
	editStates: EditStates;
	handleEditClick: (id: string, role: string) => void;
	handleRoleChange: (id: string, role: string) => void;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
	deleteUser: (id: string) => void;
}

export const UsersTableCell: React.FC<UsersTableCellProps> = ({
	roles,
	handleRoleChange,
	handleEditClick,
	editStates,
	setEditStates,
	deleteUser,
}) => {
	const [modal, setModal] = useState<{ id: string; isModal: boolean } | null>(null);
	const { users_list } = useAppSelector((state) => state.user);
	console.log(users_list);
	return (
		<>
			{modal?.isModal && (
				<div>
					<Modal
						message={'Удалить пользователя?'}
						callback={() => deleteUser(modal?.id)}
						setModal={setModal}
					/>
				</div>
			)}
			<tbody>
				{users_list?.data.map((val, index) => {
					const editState = editStates[val.id] || {
						isEditing: false,
						role: val.role,
					};
					return (
						<tr key={val.id}>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{index + 1}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{val.email}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{editState.isEditing && roles.length ? (
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
										<div className={'flex justify-between'}>
											<Button
												onClick={() =>
													handleRoleChange(
														val.id,
														editState.role,
													)
												}
												title={'Сохранить'}
											/>

											<Button
												onClick={() => {
													setEditStates((prev) => ({
														...prev,
														[val.id]: {
															...prev[val.id],
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
										{val.role}
										<Button
											onClick={() =>
												handleEditClick(val.id, val.role)
											}
											title={'Редактировать'}
										/>
									</div>
								)}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								<Button
									onClick={() =>
										setModal({ isModal: true, id: val.id })
									}
									title={'Удалить'}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</>
	);
};
