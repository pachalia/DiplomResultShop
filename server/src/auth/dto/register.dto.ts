import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from '@common/decorators';

export class RegisterDto {
	@IsEmail()
	email: string;
	@IsString()
	@MinLength(6, { message: 'Пароль должен быть не меньше 6 символов' })
	password: string;
	@IsString()
	@MinLength(6, { message: 'Пароль должен быть не меньше 6 символов' })
	@Validate(IsPasswordsMatchingConstraint)
	passwordRepeat: string;
}
