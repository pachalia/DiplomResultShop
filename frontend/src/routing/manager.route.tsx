import { Manager } from '../pages/Manager/manager.tsx';
import { AddProduct } from '@components';
import { Orders } from '../pages/Manager/Orders/orders.tsx';
import { OrderInfo } from '../pages/Manager/Orders/ordeInfo.tsx';

export const managerRoutes = [
	{
		path: 'manager',
		element: <Manager />,
	},
	{
		path: 'manager/addproduct',
		element: <AddProduct />,
	},
	{
		path: 'manager/orders',
		element: <Orders />,
	},
	{ path: 'manager/order/:id', element: <OrderInfo /> },
];
