import { useAppSelector } from '../../redux/hooks.ts';

const lineTable: string[] = ['№', 'Продукт', 'Категория', 'Цена', 'Изобр.', 'Удалить'];

export const ProductTableForAdmin = () => {
	const { products } = useAppSelector((state) => state.shop);
	return (
		<div className={'w-full flex items-center'}>
			<table style={{ width: '90%', margin: '0 auto', marginBottom: 40 }}>
				<thead>
					<tr>
						{lineTable.map((val, i) => (
							<th
								style={{
									border: '1px solid black',
									width: i === 1 ? '30%' : 'inherit',
								}}
								key={i}
							>
								{val}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{products.map((val, i) => (
						<tr
							key={val.id}
							className={'border border-solid border-gray-500'}
						>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{i + 1}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{val.name}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{val.category_id}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{val.price}
							</td>
							<td
								className={
									'border border-solid border-gray-500 text-center'
								}
							>
								{val.image ? (
									<img src={val.image} alt="" className={'m-auto'} />
								) : (
									'нет изобр'
								)}
							</td>
							<td className={'border border-solid border-gray-500'}>
								Удалить
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
