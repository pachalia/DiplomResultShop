import { Menu } from '@types';

export const MENU: Menu[] = [
	{ path: '/login', name: 'Войти' },
	{ path: '/order', name: 'Заказы' },
	{ path: '/cart', name: 'Корзина' },
];

export const ADMIN_MENU: Menu[] = [
	{ path: '/admin', name: 'Администратор' },
	{ path: '/admin/category', name: 'Категории' },
	{ path: '/admin/user', name: 'Пользователи' },
];

export const MANAGER_MENU: Menu[] = [
	{ path: '/manager', name: 'Менеджер' },
	{ path: '/manager/addproduct', name: 'Добавить продукт' },
	{ path: '/manager/orders', name: 'Заказы' },
];
