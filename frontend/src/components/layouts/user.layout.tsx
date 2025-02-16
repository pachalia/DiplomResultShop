import { Layout } from './layout.tsx';
import { MENU } from '../../constans/menu.constant.ts';
import { useAppDispatch, useAppSelector, setUser } from '@redux';
import { UserService } from '@services';
import { useNavigate } from 'react-router-dom';

export const UserLayout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const clickHandler = () => {
		UserService.logout().then((res) => {
			dispatch(setUser(null));
			res && navigate('/');
		});
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
