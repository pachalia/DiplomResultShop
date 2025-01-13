import { Card } from '../components/card/card.tsx';

export const Home: React.FC = () => {
	return (
		<div className={'flex bg-amber-50 w-10/12'}>
			<div className={'w-1/12'}></div>
			<Card />
		</div>
	);
};
