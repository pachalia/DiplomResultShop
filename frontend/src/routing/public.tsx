import { About, Home, ProductCardInfo } from '../pages';
import { ProductByCategories } from '../pages/ProductByCategories.tsx';

export const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/product/:id', element: <ProductCardInfo /> },
	{ path: '/about', element: <About /> },
	{ path: '/categories/:id', element: <ProductByCategories /> },
];
