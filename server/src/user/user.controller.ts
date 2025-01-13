import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	createUser(@Body() dto) {
		return this.userService.save(dto);
	}

	@Get(':idOrEmail')
	findUser(@Param('idOrEmail') idOrEmail: string) {
		return this.userService.findOne(idOrEmail);
	}

	@Delete(':id')
	deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
		return this.userService.delete(id, user);
	}
}
