import { UsersTableHead } from './users.table.head.tsx';
import { UsersTableCell } from './users.table.cell.tsx';
import { useEffect, useState } from 'react';
import { UserService } from '@services';
import { findUsersFormData } from '@inputs';
import { FindFormUsersComponent, Pagination, Spinner } from '@components';
import { setUsersList, useAppDispatch, useAppSelector } from '@redux';

const lineTable: string[] = ['№', 'Email', 'Role', 'Действие'];
const LIMIT = 4;
export const UsersTable = () => {
	const [roles, setRoles] = useState<string[]>([]);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; role: string };
	}>({});

	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });

	const dispatch = useAppDispatch();
	const { users_list } = useAppSelector((state) => state.user);

	useEffect(() => {
		const offset = (pagination.currentPage - 1) * LIMIT;
		UserService.getUsers(offset.toString(), LIMIT.toString(), 'desc').then((res) => {
			setPagination({ ...pagination, loading: false });
			dispatch(setUsersList(res));
		});
		UserService.getUsersRole().then((res) => setRoles(res));
	}, [dispatch, pagination.currentPage]);

	const handleEditClick = (userId: string, currentRole: string) => {
		setEditStates((prev) => ({
			...prev,
			[userId]: { isEditing: true, role: currentRole },
		}));
	};

	const handleRoleChange = async (userId: string, newRole: string) => {
		UserService.updateRoleUser(userId, newRole).then((res) => {
			const userArray = users_list?.data && [...users_list.data];
			if (userArray) {
				const index = userArray.findIndex((val) => val.id === userId);
				userArray[index] = res.data;
				dispatch(setUsersList({ ...users_list, data: userArray }));
			}

			setEditStates((prev) => ({
				...prev,
				[userId]: { isEditing: false, role: prev[userId].role },
			}));
		});
	};
	const deleteUserHandler = (id: string) => {
		UserService.deleteUser(id).then(() => {
			if (users_list?.data) {
				let newArr = [...users_list.data];
				newArr = newArr.filter((val) => val.id !== id);
				dispatch(setUsersList({ ...users_list, data: newArr }));
			}
		});
	};

	const onSubmit = async (data: findUsersFormData) => {
		data.email
			? UserService.findUsersByEmail(data.email.trim().toLowerCase()).then(
					(res) => {
						const total = res.data.length;
						dispatch(setUsersList({ total, data: res.data }));
					},
				)
			: UserService.getUsers().then((res) => dispatch(setUsersList(res)));
	};
	const totalPages = users_list.total ? Math.ceil(users_list.total / LIMIT) : 0;
	return (
		<>
			<FindFormUsersComponent onSubmit={onSubmit} />
			{!pagination.loading ? (
				<>
					<table>
						<UsersTableHead lineTable={lineTable} />
						<UsersTableCell
							roles={roles}
							editStates={editStates}
							setEditStates={setEditStates}
							handleEditClick={handleEditClick}
							handleRoleChange={handleRoleChange}
							deleteUser={deleteUserHandler}
						/>
					</table>
					{totalPages > 1 && (
						<Pagination
							pagination={pagination}
							setPagination={setPagination}
							totalPages={totalPages}
						/>
					)}
				</>
			) : (
				<div className={'flex justify-center'}>
					<Spinner />
				</div>
			)}
		</>
	);
};
