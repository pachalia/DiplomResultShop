import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderItemDto {
	@IsNotEmpty()
	@IsString()
	orderId: string;
	@IsNotEmpty()
	@IsString()
	productId: string;
	@IsNotEmpty()
	@IsString()
	quantity: string;
	@IsNotEmpty()
	@IsString()
	price: string;
}
