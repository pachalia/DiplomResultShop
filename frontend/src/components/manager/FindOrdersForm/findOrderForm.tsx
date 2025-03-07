import { orderStatus } from '@utils';
import { Status } from '@interfaces';
import { Button } from '@components';
import { useForm } from 'react-hook-form';
import { FindOrdersFieldConfig, FindOrdersFormData } from '@inputs';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';

const status = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVIRED', 'CANCELLED'];
interface FindOrderFormProps {
	onSubmit: (data: FindOrdersFormData) => void;
}
export const FindOrderForm: React.FC<FindOrderFormProps> = ({ onSubmit }) => {
	const formMethods = useForm<FindOrdersFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, FindOrdersFieldConfig);
	return (
		<div className={'w-5/12 m-auto'}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
				{controllers.map(({ field }, index) => (
					<label
						key={index}
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-5/12 mr-4'
						}
					>
						{field.name === 'status' && 'Статус для поиска:'}
						{field.name === 'email' && 'email для поиска:'}
						{field.name === 'email' ? (
							<input {...field} />
						) : (
							<select
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								onBlur={field.onBlur}
							>
								<option value={''}>{''}</option>
								{status.map((val) => (
									<option key={val} value={val}>
										{orderStatus(val as Status)}
									</option>
								))}
							</select>
						)}
					</label>
				))}
				<Button title={'Найти'} type={'submit'} />
			</form>
		</div>
	);
};
