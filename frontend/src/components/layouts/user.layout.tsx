import { Layout } from './layout.tsx';
import { MENU } from '@constans';
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
			menuItems={MENU}
			user={user}
			userLayout={true}
			onLogout={clickHandler}
		/>
	);
};
