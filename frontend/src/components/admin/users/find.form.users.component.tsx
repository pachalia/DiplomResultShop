import { Button } from '@components';
import { useForm } from 'react-hook-form';
import { findUsersFieldConfig, findUsersFormData } from '@inputs';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';

interface findFormUsersProps {
	onSubmit: (data: findUsersFormData) => void;
}
export const FindFormUsersComponent: React.FC<findFormUsersProps> = ({ onSubmit }) => {
	const formMethods = useForm<findUsersFormData>();
	const controllers = useFormControllers(formMethods, findUsersFieldConfig);
	return (
		<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
			{controllers.map(({ field }, index) => (
				<label
					key={index}
					className={
						'flex flex-col p-1 border border-solid border-gray-400 mb-2.5'
					}
				>
					{field.name === 'email' && 'Email:'}
					<input
						{...field}
						placeholder={'Введите email для поиска'}
						type={'text'}
						className={'w-full p-3 border-b-gray-800 border border-solid'}
					/>
				</label>
			))}
			<Button type={'submit'} title={'Найти'} />
		</form>
	);
};
