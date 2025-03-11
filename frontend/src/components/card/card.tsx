import { NavLink } from 'react-router-dom';

interface IProductsCardProps {
	id: string;
	image: string | null;
	name: string;
	price: number;
	quantity: number;
}
export const Card: React.FC<IProductsCardProps> = ({
	image,
	price,
	name,
	id,
	quantity,
}) => {
	return (
		<>
			<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
				{image && <img className="rounded-t-lg m-auto" src={image} alt="" />}
				<div className="p-5">
					<a href="#">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
							{name}
						</h5>
					</a>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{`Цена ${price}р.`}
					</p>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{`Осталось ${quantity}`}
					</p>
					<NavLink
						to={`/product/${id}`}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Узнать больше
						<svg
							className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</NavLink>
				</div>
			</div>
		</>
	);
};
