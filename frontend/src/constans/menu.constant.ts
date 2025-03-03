import { Menu } from '@types';

export const MENU: Menu[] = [
	{ path: '/', name: 'Главная' },
	{ path: '/about', name: 'О нас' },
	{ path: '/cart', name: 'Корзина' },
	{ path: '/login', name: 'Войти' },
];

export const ADMIN_MENU: Menu[] = [
	{ path: '/admin', name: 'Администратор' },
	{ path: '/admin/category', name: 'Категории' },
	{ path: '/admin/user', name: 'Пользователи' },
];

export const MANAGER_MENU: Menu[] = [
	{ path: '/manager', name: 'Менеджер' },
	{ path: '/manager/addproduct', name: 'Добавить продукт' },
	{ path: '/manager/orders/1', name: 'Заказы' },
];
