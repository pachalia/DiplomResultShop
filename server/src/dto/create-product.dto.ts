import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePtoductDto {
	@IsNotEmpty()
	@IsString()
	name: string;
	@IsNotEmpty()
	@IsString()
	description: string;
	@IsNotEmpty()
	// @IsNumber()
	price: string;
	@IsNotEmpty()
	@IsString()
	category: string;
	@IsNotEmpty()
	quantity: string;
}
