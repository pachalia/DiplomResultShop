import { UsersTableHead } from './UsersTableHead.tsx';
import { UsersTableCell } from './UsersTableCell.tsx';
import { useEffect, useState } from 'react';
import { IUser } from '@interfaces';
import { UserService } from '@services';
import { useForm } from 'react-hook-form';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { findUsersFieldConfig, findUsersFormData } from '@inputs';
import { Button } from '@components';

const lineTable: string[] = ['№', 'Email', 'Role', 'Удалить'];
export const UsersTable = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [roles, setRoles] = useState<string[]>([]);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; role: string };
	}>({});

	const formMethods = useForm<findUsersFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, findUsersFieldConfig);
	const getUsers = async () => {
		const res = await UserService.getUsers();
		if (res?.data) setUsers(res.data);
	};
	useEffect(() => {
		getUsers();
		UserService.getUsersRole().then((res) => setRoles(res));
	}, []);

	const handleEditClick = (userId: string, currentRole: string) => {
		setEditStates((prev) => ({
			...prev,
			[userId]: { isEditing: true, role: currentRole },
		}));
	};

	const handleRoleChange = async (userId: string, newRole: string) => {
		UserService.updateRoleUser(userId, newRole).then((res) => {
			const userArray = [...users];
			const index = userArray.findIndex((val) => val.id === userId);
			userArray[index] = res.data;
			setUsers(() => [...userArray]);
			setEditStates((prev) => ({
				...prev,
				[userId]: { isEditing: false, role: prev[userId].role },
			}));
		});
	};
	const deleteUserHandler = (id: string) => {
		UserService.deleteUser(id).then(() => {
			let newArr = [...users];
			newArr = newArr.filter((val) => val.id !== id);
			setUsers(() => [...newArr]);
		});
	};

	const onSubmit = (data: findUsersFormData) => {
		data.email
			? UserService.findUsersByEmail(data.email.trim().toLowerCase()).then(
					(res) => {
						res && setUsers(() => [...res]);
					},
				)
			: getUsers();
	};
	return (
		<>
			<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
				{controllers.map(({ field }, index) => (
					<label
						key={index}
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5'
						}
					>
						{field.name === 'email' && 'Email:'}
						<input
							{...field}
							placeholder={'Введите email для поиска'}
							type={'text'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
					</label>
				))}
				<Button type={'submit'} title={'Найти'} />
			</form>
			<table>
				<UsersTableHead lineTable={lineTable} />
				<UsersTableCell
					roles={roles}
					users={users}
					editStates={editStates}
					setEditStates={setEditStates}
					handleEditClick={handleEditClick}
					handleRoleChange={handleRoleChange}
					deleteUser={deleteUserHandler}
				/>
			</table>
		</>
	);
};
