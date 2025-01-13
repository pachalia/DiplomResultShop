import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks.ts';

export const Category = () => {
	const { categories } = useAppSelector((state) => state.shop);

	return (
		<>
			<aside className={'flex flex-col w-4/12 justify-center items-center'}>
				{categories &&
					categories.map((val, i) => (
						<NavLink key={i} to={`categories/${val}`}>
							{val}
						</NavLink>
					))}
			</aside>
			<Outlet />
		</>
	);
};
