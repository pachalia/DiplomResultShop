import { UsersTable } from './UsersTable.tsx';

export const Users = () => {
	return (
		<div className={'w-full flex items-center flex-col'}>
			<h1>Таблица пользователей</h1>
			<UsersTable />
		</div>
	);
};
