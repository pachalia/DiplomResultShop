import { Menu } from '../../types/menu.type.ts';

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
