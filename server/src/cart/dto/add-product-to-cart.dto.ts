import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class AddProductToCartDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	productId: string;

	@IsNumber()
	@IsNotEmpty()
	quantity: string;
}
