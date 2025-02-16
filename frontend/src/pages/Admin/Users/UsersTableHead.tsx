import React from 'react';

interface UsersTableHeadProps {
	lineTable: string[];
}
export const UsersTableHead: React.FC<UsersTableHeadProps> = ({ lineTable }) => {
	return (
		<thead>
			<tr>
				{lineTable.map((val, i) => (
					<th
						style={{
							border: '1px solid black',
							width:
								i === 0
									? '3%'
									: i === 1
										? '12%'
										: i === 2
											? '35%'
											: '10%',
						}}
						key={i}
					>
						{val}
					</th>
				))}
			</tr>
		</thead>
	);
};
