import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class PaginationDto {
	@IsOptional()
	@Min(0)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	offset = 0;

	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@IsPositive()
	limit?: number;

	@IsOptional()
	@IsString()
	category?: string;

	@IsOptional()
	order?: Prisma.SortOrder;
}
