import { UserLayout } from './user.layout.tsx';
import { useAppSelector } from '@redux';
import { AdminLayout } from './admin.layout.tsx';
import { Outlet } from 'react-router-dom';
import { Alert } from '../alert/alert.tsx';
import { ManagerLayout } from './manager.layout.tsx';

export const GeneralLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<>
			<Alert />
			<div className={'w-10/12 m-auto'}>
				<header>
					{user?.role === 'ADMIN' && <AdminLayout />}
					{user?.role === 'MANAGER' && <ManagerLayout />}
					<UserLayout />
				</header>
				<div className={'flex bg-amber-50 h-screen'}>
					<Outlet />
				</div>
			</div>
		</>
	);
};
