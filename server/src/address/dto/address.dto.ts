import { Address } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto implements Omit<Address, 'id' | 'userId'> {
	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	state: string;

	@IsNotEmpty()
	@IsString()
	street: string;

	@IsNotEmpty()
	@IsString()
	zipCode: string;

	@IsNotEmpty()
	@IsString()
	phone: string;
}
