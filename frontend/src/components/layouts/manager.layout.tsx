import { Layout } from './layout.tsx';
import { MANAGER_MENU } from '@constans';
import { useAppSelector } from '@redux';

export const ManagerLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<Layout
			title="Панель Менеджера"
			menuItems={MANAGER_MENU}
			user={user}
			margin={true}
		/>
	);
};
