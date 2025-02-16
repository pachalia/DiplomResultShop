import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '@auth/guargs/role.guard';
import { Roles } from '@common/decorators';
import { Role, User } from '@prisma/client';
import { PaginationDto } from '../shared/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers(@Query() usersPaginationDto: PaginationDto) {
		const usersPagination = plainToInstance(PaginationDto, usersPaginationDto);
		const [data, total] = await this.userService.getUsers(usersPagination);
		return { ...usersPagination, data, total };
	}
	@Get('role')
	getRoles(): Role[] {
		return Object.values(Role);
	}

	@Get(':idOrEmail')
	async findUser(@Param('idOrEmail') idOrEmail: string) {
		return await this.userService.findUsers(idOrEmail);
	}

	@Delete(':id')
	async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
		return await this.userService.delete(id);
	}

	@Put()
	async updateRoleUser(@Body() user: Partial<User>) {
		return await this.userService.updateRole(user);
	}
}
