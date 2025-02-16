import { Admin, AdminCategory, Users } from '../pages';

export const adminRoutes = [
	{
		path: 'admin',
		element: <Admin />,
	},
	{
		path: 'admin/user',
		element: <Users />,
	},
	{
		path: 'admin/category',
		element: <AdminCategory />,
	},
];
