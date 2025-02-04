import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddProductToCartDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	productId: string;

	@IsString()
	@IsNotEmpty()
	quantity: string;
}
