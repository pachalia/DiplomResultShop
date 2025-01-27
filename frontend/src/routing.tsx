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
					<Route path={'/'} element={<Home />} />
					<Route path={'product/:id'} element={<ProductCardInfo />} />
					<Route path={'about'} element={<About />} />

					<Route
						path={'cart'}
						element={user ? <Cart /> : <Navigate to={'/'} />}
					/>
				</Route>
				<Route
					path={'login'}
					element={!user ? <Login /> : <Navigate to={'/'} />}
				/>

				<Route
					path={'register'}
					element={!user ? <Register /> : <Navigate to={'/'} />}
				/>
				<Route
					path={'admin'}
					element={user?.role === 'ADMIN' ? <Admin /> : <Navigate to={'/'} />}
				/>
				<Route path={'404'} element={<NotFound />} />
				<Route path={'*'} element={<Navigate to={'404'} />} />
			</Route>
		</Routes>
	);
};
