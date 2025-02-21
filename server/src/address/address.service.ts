import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
	constructor(private readonly prismaService: PrismaService) {}
	private logger = new Logger(AddressService.name);

	async updateAddress(userId: string, address: AddressDto) {
		const res = await this.prismaService.address
			.update({
				where: { userId },
				data: { ...address },
			})
			.catch((e: Error) => {
				this.logger.error(e.message);
				return null;
			});

		return {
			city: res.city,
			state: res.state,
			street: res.street,
			phone: res.phone,
			zipCode: res.zipCode,
		};
	}

	async getAddress(userId: string) {
		const res = await this.prismaService.address
			.findFirst({ where: { userId } })
			.catch((e: Error) => {
				this.logger.error(e.message);
				return null;
			});
		return {
			city: res.city,
			state: res.state,
			street: res.street,
			phone: res.phone,
			zipCode: res.zipCode,
		};
	}
}
