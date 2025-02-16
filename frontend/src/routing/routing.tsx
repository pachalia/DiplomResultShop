import { Navigate, Route, Routes } from 'react-router-dom';
import { Cart, NotFound } from '../pages';
import { useAppSelector } from '@redux';
import { Category, GeneralLayout } from '@components';
import {
	managerRoutes,
	publicRoutes,
	authRoutes,
	adminRoutes,
	ProtectedRoute,
} from '@routing';
import { Address } from '../pages/Address.tsx';

export const Routing = () => {
	const user = useAppSelector((state) => state.user.current_user);
	return (
		<Routes>
			<Route element={<GeneralLayout />}>
				<Route element={<Category />}>
					{publicRoutes.map(({ path, element }) => (
						<Route path={path} element={element} />
					))}
					<Route path={'cart'} element={user && <Cart />} />
					<Route path={'address'} element={<Address />} />
				</Route>
				{authRoutes.map(({ path, element }) => (
					<Route
						path={path}
						element={
							user?.role === 'ADMIN' ? (
								<Navigate to={'/admin'} />
							) : user?.role === 'MANAGER' ? (
								<Navigate to={'/manager'} />
							) : user?.role === 'CUSTOMER' ? (
								<Navigate to={'/'} />
							) : (
								element
							)
						}
					/>
				))}
				{adminRoutes.map(({ path, element }) => (
					<Route
						path={path}
						element={
							<ProtectedRoute
								element={element}
								condition={user?.role === 'ADMIN'}
							/>
						}
					/>
				))}
				{managerRoutes.map(({ path, element }) => (
					<Route
						path={path}
						element={
							<ProtectedRoute
								element={element}
								condition={user?.role === 'MANAGER'}
							/>
						}
					/>
				))}
				<Route path={'404'} element={<NotFound />} />
				<Route path={'*'} element={<Navigate to={'/404'} />} />
			</Route>
		</Routes>
	);
};
