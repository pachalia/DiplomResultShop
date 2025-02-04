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
								i === 0 ? '5%' : i === 1 ? '15%' : i === 2 ? '8%' : '10%',
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
