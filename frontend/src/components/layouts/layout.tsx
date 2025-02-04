import { NavLink } from 'react-router-dom';
import { IUser } from '../../interfaces/user.interface.ts';
import { Menu } from '../../../types/menu.type.ts';

interface LayoutProps {
	title: string;
	user: IUser | null;
	menuItems: Menu[];
	onLogout?: () => void;
	margin?: boolean;
}
export const Layout: React.FC<LayoutProps> = ({
	title,
	menuItems,
	user,
	onLogout,
	margin,
}) => {
	return (
		<div className={`${margin ? 'h8 mb-5' : 'h-8'}`}>
			<div className={'bg-green-500 flex'}>
				<div className={'text-white text-2xl pl-3'}>{title}</div>
				<div
					className={
						'flex text-amber-400 text-2xl w-6/12 justify-between m-auto'
					}
				>
					{menuItems.map((val) => (
						<NavLink end key={val.path} to={val.path}>
							{val.name}
						</NavLink>
					))}
					{onLogout && user && (
						<div className={'cursor-pointer'} onClick={onLogout}>
							Выход
						</div>
					)}
				</div>
				{onLogout && user && (
					<div className={'text-white text-xl'}>
						{`${user.email}/${user.role}`}
					</div>
				)}
			</div>
		</div>
	);
};
