import { UserLayout } from './user.layout.tsx';
import { useAppSelector } from '../../redux/hooks.ts';
import { AdminLayout } from './admin.layout.tsx';
import { Outlet } from 'react-router-dom';

export const GeneralLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<div className={'w-10/12 m-auto'}>
			<header>
				{user?.role === 'ADMIN' && <AdminLayout />}
				<UserLayout />
			</header>
			<div className={'flex bg-amber-50 h-screen'}>
				<Outlet />
			</div>
		</div>
	);
};
