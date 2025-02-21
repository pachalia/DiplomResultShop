import { Body, Controller, Get, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@Get()
	async getAddress(@CurrentUser() user: JwtPayload) {
		return await this.addressService.getAddress(user.id);
	}

	@Put()
	async updateAddress(@CurrentUser() user: JwtPayload, @Body() dto: AddressDto) {
		return await this.addressService.updateAddress(user.id, dto);
	}
}
