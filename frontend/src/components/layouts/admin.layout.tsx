import { Layout } from './layout.tsx';
import { ADMIN_MENU } from '../../constans/menu.constant.ts';
import { useAppSelector } from '../../redux/hooks.ts';

export const AdminLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<Layout
			title="Панель Администратора"
			menuItems={ADMIN_MENU}
			user={user}
			margin={true}
		/>
	);
};
