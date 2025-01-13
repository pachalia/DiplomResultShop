import { JwtPayload } from '@auth/interfaces';
import { convertToSecondsUtil } from '@common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';

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
		return user;
	}

	async delete(id: string, user: JwtPayload) {
		if (user.id !== id && !user.role.includes(Role.ADMIN)) {
			throw new ForbiddenException();
		}
		const userFind = await this.findOne(id);
		if (!userFind) return null;
		await Promise.all([this.cacheManager.del(id), this.cacheManager.del(user.email)]);
		return this.prismaService.user.delete({ where: { id }, select: { id: true } });
	}

	private hashPassword(password: string) {
		return hashSync(password, genSaltSync(10));
	}
}
