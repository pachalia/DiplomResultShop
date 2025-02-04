import { Navigate, Route, Routes } from 'react-router-dom';
import {
	About,
	Admin,
	Cart,
	Home,
	Login,
	NotFound,
	ProductCardInfo,
	Register,
} from '../pages';
import { useAppSelector } from '../redux/hooks.ts';
import { GeneralLayout, Category, AddCategory } from '../components';
import { Users } from '../pages/Admin/Users/Users.tsx';

interface ProtectedRouteProps {
	element: React.ReactNode;
	condition: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, condition }) => {
	return condition ? element : <Navigate to="/" />;
};

export const Routing = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<Routes>
			<Route element={<GeneralLayout />}>
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
					path="admin"
					element={
						<ProtectedRoute
							element={<Admin />}
							condition={user?.role === 'ADMIN'}
						/>
					}
				/>
				<Route
					path="admin/user"
					element={
						<ProtectedRoute
							element={<Users />}
							condition={user?.role === 'ADMIN'}
						/>
					}
				/>
				<Route
					path="admin/category"
					element={
						<ProtectedRoute
							element={<AddCategory />}
							condition={user?.role === 'ADMIN'}
						/>
					}
				/>
				<Route path={'404'} element={<NotFound />} />
				<Route path={'*'} element={<Navigate to={'/404'} />} />
			</Route>
		</Routes>
	);
};
