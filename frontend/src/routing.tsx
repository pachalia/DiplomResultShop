import { Navigate, Route, Routes } from 'react-router-dom';
import { Category, Layout } from './components';
import {
	About,
	Admin,
	Cart,
	Home,
	Login,
	NotFound,
	ProductCardInfo,
	Register,
} from './pages';
import { useAppSelector } from './redux/hooks.ts';

export const Routing = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route element={<Category />}>
					<Route path={'diplomshop/'} element={<Home />} />
					<Route
						path={'diplomshop/product/:id'}
						element={<ProductCardInfo />}
					/>
					<Route path={'diplomshop/about'} element={<About />} />

					<Route
						path={'diplomshop/cart'}
						element={user ? <Cart /> : <Navigate to={'diplomshop/'} />}
					/>
				</Route>
				<Route
					path={'diplomshop/login'}
					element={!user ? <Login /> : <Navigate to={'diplomshop/'} />}
				/>

				<Route
					path={'diplomshop/register'}
					element={!user ? <Register /> : <Navigate to={'/'} />}
				/>
				<Route
					path={'diplomshop/admin/'}
					element={
						user?.role === 'ADMIN' ? (
							<Admin />
						) : (
							<Navigate to={'diplomshop/'} />
						)
					}
				/>
				<Route path={'diplomshop/404'} element={<NotFound />} />
				<Route
					path={'diplomshop/*'}
					element={<Navigate to={'diplomshop/404'} />}
				/>
			</Route>
		</Routes>
	);
};
