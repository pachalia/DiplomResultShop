import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { GUARDS } from '@auth/guargs';

@Module({
	providers: [UserService, PrismaService, ...GUARDS],
	controllers: [UserController],
	exports: [UserService],
	imports: [CacheModule.register()],
})
export class UserModule {}
