import { PaginationDto } from './pagination.dto';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class OrderPaginationDto extends PaginationDto {
	@IsOptional()
	@IsEnum(OrderStatus)
	status?: OrderStatus;

	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	actual_order?: 'actual' | 'notActual';
}
