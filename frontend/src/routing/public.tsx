import { About, Home, ProductCardInfo } from '../pages';

export const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/product/:id', element: <ProductCardInfo /> },
	{ path: '/about', element: <About /> },
];
