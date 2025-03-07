import { Cart, Home, ProductCardInfo } from '../pages';
import { ProductByCategories } from '../pages/ProductByCategories.tsx';
import { Find } from '../pages/Find.tsx';
import { UserOrder } from '../pages/UserOrder.tsx';

export const publicRoutes = [
	{ path: '/', element: <Home /> },
	{ path: '/product/:id', element: <ProductCardInfo /> },
	{ path: '/cart', element: <Cart /> },
	{ path: '/categories/:id', element: <ProductByCategories /> },
	{ path: '/find', element: <Find /> },
	{ path: '/order', element: <UserOrder /> },
];
