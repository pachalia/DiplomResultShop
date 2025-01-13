import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { options } from './configs/jwt-module-async-options';
import { PrismaService } from '@prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { GUARDS } from '@auth/guargs';
import { STRTAGIES } from '@auth/strategies';

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, ...STRTAGIES, ...GUARDS],
	imports: [PassportModule, JwtModule.registerAsync(options()), UserModule, HttpModule],
})
export class AuthModule {}
