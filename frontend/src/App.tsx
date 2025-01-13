import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Layout } from './components/layouts/layout.tsx';
import { Register } from './pages/Register.tsx';
import { About } from './pages/About.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { Login } from './pages/Login.tsx';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import {
	setCategories,
	setProducts,
	setUser,
	User,
} from './redux/features/slices/shopSlice.ts';
import { Product } from './pages/Product.tsx';
import { Card } from './components/card/card.tsx';
import { Cart } from './pages/Cart.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Category } from './components/category/category.tsx';
import { Admin } from './pages/Admin.tsx';
import axios from 'axios';
import { URL_API_CATEGORIES, URL_API_PRODUCTS } from './constans/url.constans.ts';

function App() {
	const user = useAppSelector((state) => state.shop.current_user);
	const dispatch = useAppDispatch();
	const token = window.localStorage.getItem('token');
	const _user = token ? jwtDecode<User>(token) : null;
	useEffect(() => {
		if (_user) dispatch(setUser(_user));
		axios
			.get<{ name: string }[]>(URL_API_CATEGORIES)
			.then((res) => dispatch(setCategories(res.data.map((val) => val.name))));
		axios.get(URL_API_PRODUCTS).then((res) => dispatch(setProducts(res.data)));
	}, []);
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route element={<Category />}>
						<Route index element={<Home />} />
						<Route path={'product/:id'} element={<Product />} />
						<Route path={'about'} element={<About />} />
						<Route path={'categories/:id'} element={<Card />} />
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
					{user?.role === 'ADMIN' && (
						<Route path={'admin'} element={<Admin />} />
					)}

					<Route path={'404'} element={<NotFound />} />
					<Route path={'*'} element={<Navigate to={'/404'} />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
