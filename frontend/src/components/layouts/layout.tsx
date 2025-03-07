import { NavLink } from 'react-router-dom';
import { ICategory, IUser } from '@interfaces';
import { Menu } from '@types';
import { useEffect, useState } from 'react';
import { PaginationResponse } from '../../responses/pagination.response.ts';
import { CategoryService } from '@services';
import { FindProductComponent } from '../findProductComponent/find.product.component.tsx';

interface LayoutProps {
	title: string;
	user: IUser | null;
	menuItems: Menu[];
	onLogout?: () => void;
	margin?: boolean;
	userLayout?: boolean;
}
export const Layout: React.FC<LayoutProps> = ({
	title,
	menuItems,
	user,
	onLogout,
	margin,
	userLayout,
}) => {
	const [categories, setCategories] = useState<PaginationResponse<ICategory[]>>();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [isMenuUserOpen, setIsMenuUserOpen] = useState<boolean>(false);
	const clickHandler = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const clickUserMenuHandler = () => {
		setIsMenuUserOpen(!isMenuUserOpen);
	};

	useEffect(() => {
		CategoryService.getUserCategory().then((res) => setCategories(res.data));
	}, []);
	return (
		<div className={`${margin ? 'h8 mb-5' : ''}`}>
			<div className={`bg-green-500 flex ${userLayout && 'py-3'}`}>
				{userLayout ? (
					<div className={'flex w-6/12 justify-around'}>
						<NavLink to={'/'} className={'text-2xl pl-3 text-white'}>
							{title}
						</NavLink>
						<div className={'flex justify-between items-center w-6/12'}>
							<div
								className={
									'text-white bg-blue-700 font-bold cursor-pointer'
								}
								style={{ padding: '0 10px' }}
								onClick={clickHandler}
							>
								Каталог
							</div>
							<FindProductComponent />
							{isMenuOpen && (
								<div
									className={'flex flex-col absolute'}
									style={{
										top: `${!user ? '7%' : '12%'}`,
										background: 'antiquewhite',
										padding: '0 10px',
										zIndex: '10',
									}}
								>
									{categories &&
										categories.data.map((val, index) => (
											<NavLink
												key={index}
												to={`/categories/${val.name}`}
												className={'text-black'}
												onClick={clickHandler}
											>
												{val.name}
											</NavLink>
										))}
								</div>
							)}
						</div>
					</div>
				) : (
					<div className={'text-white text-2xl pl-3'}>{title}</div>
				)}

				<div
					className={
						'flex text-amber-400 text-2xl w-6/12 justify-between m-auto'
					}
				>
					{menuItems.map((val, index) => {
						if (user && val.name === 'Войти') {
							return (
								<div
									className={'text-white text-lg cursor-pointer'}
									key={index}
									onClick={clickUserMenuHandler}
								>
									{user.email}
									{isMenuUserOpen && (
										<div
											className={'absolute flex flex-col'}
											style={{
												top: '12%',
												background: 'antiquewhite',
												padding: '0 10px',
												zIndex: '15',
											}}
											onClick={clickUserMenuHandler}
										>
											<NavLink
												to={'/address'}
												className={'text-black'}
											>
												Адрес для доставки
											</NavLink>
											<div
												className={'text-black'}
												onClick={onLogout}
											>
												Выход
											</div>
										</div>
									)}
								</div>
							);
						} else {
							return (
								<NavLink end key={val.path} to={val.path}>
									{val.name}
								</NavLink>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};
