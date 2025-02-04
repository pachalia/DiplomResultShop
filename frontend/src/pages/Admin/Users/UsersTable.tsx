import { UsersTableHead } from './UsersTableHead.tsx';
import { UsersTableCell } from './UsersTableCell.tsx';
import { useEffect, useState } from 'react';
import { IUser } from '../../../interfaces/user.interface.ts';
import { UserService } from '../../../services';

const lineTable: string[] = ['№', 'Email', 'Role', 'Удалить'];
const roles = ['ADMIN', 'MANAGER', 'CUSTOMER'];
export const UsersTable = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; role: string };
	}>({});
	useEffect(() => {
		const getUsers = async () => {
			const res = await UserService.getUsers();
			if (res?.data) setUsers(res.data);
		};
		getUsers();
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
	return (
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
	);
};
