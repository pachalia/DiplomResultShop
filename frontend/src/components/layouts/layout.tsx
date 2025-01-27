import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { setUser } from '../../redux/features/slices/userSlice.ts';

export const Layout = () => {
	const user = useAppSelector((state) => state.user.current_user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<>
			<div className={'w-10/12 m-auto'}>
				<header className={'h-8'}>
					<div className={'flex bg-green-500 justify-between'}>
						<div className={'text-white text-2xl pl-3'}>
							Магазин Васи Пупкина
						</div>
						<div
							className={
								'flex text-amber-400 text-2xl w-6/12 justify-between'
							}
						>
							<NavLink to={'/'}>Главная</NavLink>
							<NavLink to={'/about'}>О нас</NavLink>
							{!user && <NavLink to={'/register'}>Регистрация</NavLink>}
							{!user && <NavLink to={'/login'}>Логин</NavLink>}
							{user && <NavLink to={'/cart'}>Корзина</NavLink>}
							<NavLink to={'/admin'}>Admin</NavLink>
							{user && (
								<div
									className={'cursor-pointer'}
									onClick={() => {
										window.localStorage.removeItem('token');
										dispatch(setUser(null));
										navigate('/login');
									}}
								>
									Выход
								</div>
							)}
						</div>
						{user && (
							<div
								className={'text-white text-xl'}
							>{`${user.email}/${user.role}`}</div>
						)}
					</div>
				</header>
				<div className={'flex bg-amber-50 h-screen'}>
					<Outlet />
				</div>
			</div>
		</>
	);
};
