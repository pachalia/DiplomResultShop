import { Manager } from '../pages/Manager/manager.tsx';
import { AddProduct } from '@components';
import { Orders } from '../pages/Manager/Orders/orders.tsx';

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
];
