import { ControllerRenderProps } from 'react-hook-form';

interface IInputProps {
	className?: string;
	placeholder?: string;
	field: ControllerRenderProps<FormData, 'name'>;
}
export const Input: React.FC<IInputProps> = ({ className, placeholder }) => {
	return <input className={className} placeholder={placeholder} />;
};
