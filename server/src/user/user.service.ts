import { convertToSecondsUtil } from '@common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';
import { PaginationDto } from '../shared/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly configService: ConfigService,
	) {}

	async save(user: Partial<User>): Promise<User> {
		const hashedPassword = user?.password ? this.hashPassword(user.password) : null;
		const count = await this.prismaService.user.count();
		const savedUser = await this.prismaService.user.upsert({
			where: {
				email: user.email,
			},
			update: {
				password: hashedPassword ?? undefined,
				provider: user?.provider ?? undefined,
				role: user?.role ?? undefined,
			},
			create: {
				email: user.email,
				password: hashedPassword,
				provider: user?.provider,
				role: count === 0 ? 'ADMIN' : 'CUSTOMER',
			},
		});
		await this.cacheManager.set(savedUser.id, savedUser);
		await this.cacheManager.set(savedUser.email, savedUser);
		return savedUser;
	}

	async getUsers(
		userPagination: PaginationDto,
	): Promise<[Pick<User, 'id' | 'email' | 'role'>[], number]> {
		const {
			order,
			offset: skip,
			limit: take,
		} = plainToInstance(PaginationDto, userPagination);
		if (order && order !== 'asc' && order !== 'desc') {
			throw new BadRequestException(
				`Нужно указать 'asc' или 'desc'. У вас указан '${order}'`,
			);
		}
		const users = await this.prismaService.user.findMany({
			skip,
			take,
			orderBy: { email: order },
		});
		const _users = users.map((val) => {
			return {
				id: val.id,
				email: val.email,
				role: val.role,
			};
		});
		const count = await this.prismaService.user.count();
		return [_users, count];
	}

	async findOne(idOrEmail: string, isReset = false): Promise<User> {
		if (isReset) {
			await this.cacheManager.del(idOrEmail);
		}
		const user = await this.cacheManager.get<User>(idOrEmail);
		if (!user) {
			const user = await this.prismaService.user.findFirst({
				where: {
					OR: [{ id: idOrEmail }, { email: idOrEmail }],
				},
			});
			if (!user) {
				return null;
			}
			await this.cacheManager.set(
				idOrEmail,
				user,
				convertToSecondsUtil(this.configService.get('JWT_EXP')),
			);
			return user;
		}
		delete user.password;
		delete user.provider;
		delete user.createdAt;
		delete user.updatedAt;
		return user;
	}

	async delete(id: string) {
		const userFind = await this.findOne(id);
		if (!userFind) return null;
		await Promise.all([
			this.cacheManager.del(id),
			this.cacheManager.del(userFind.email),
		]);
		return this.prismaService.user.delete({ where: { id }, select: { id: true } });
	}

	async updateRole(user: Partial<User>) {
		if (!user.id || !user.role) {
			throw new BadRequestException('Не передан id или роль');
		}
		const userFind = await this.findOne(user.id);
		if (!userFind) throw new NotFoundException('Пользователь не найден');
		const _user = await this.prismaService.user.update({
			where: { id: user.id },
			data: { role: user.role },
		});
		delete _user.password;
		delete _user.provider;
		delete _user.createdAt;
		delete _user.updatedAt;
		return _user;
	}

	private hashPassword(password: string) {
		return hashSync(password, genSaltSync(10));
	}
}
