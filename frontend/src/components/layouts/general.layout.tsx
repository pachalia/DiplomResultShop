import { UserLayout, AdminLayout, Alert, ManagerLayout } from '@components';
import { useAppSelector } from '@redux';
import { Outlet } from 'react-router-dom';

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
				<div className={'flex bg-amber-50'} style={{ minHeight: '100vh' }}>
					<Outlet />
				</div>
			</div>
		</>
	);
};
