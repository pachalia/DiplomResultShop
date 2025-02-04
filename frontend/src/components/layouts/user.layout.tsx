import { Layout } from './layout.tsx';
import { MENU } from '../../constans/menu.constant.ts';
import { useAppSelector } from '../../redux/hooks.ts';
import { UserService } from '../../services';

export const UserLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	const clickHandler = () => {
		UserService.logout();
	};
	return (
		<Layout
			title="Магазин Васи Пупкина"
			menuItems={MENU.filter(
				(val) =>
					(user && val.path !== '/login') || (!user && val.path !== '/cart'),
			)}
			user={user}
			onLogout={clickHandler}
		/>
	);
};
