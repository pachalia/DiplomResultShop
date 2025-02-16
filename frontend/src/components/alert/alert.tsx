import './alert.css';
import { useAppSelector } from '@redux';

export const Alert: React.FC = () => {
	const message = useAppSelector((state) => state.message.message);
	const type = message?.type;
	return (
		<>
			{message?.message && (
				<div
					className={`flex items-center ${type === 'success' && 'bg-blue-500'} ${type === 'danger' && 'bg-red-500'} text-white text-sm font-bold px-4 py-3 absolute alert`}
					role="alert"
				>
					<p>{message.message}</p>
				</div>
			)}
		</>
	);
};
