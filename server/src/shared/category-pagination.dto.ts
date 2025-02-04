import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class CategoryPaginationDto extends PaginationDto {
	@IsOptional()
	@IsString()
	category?: string;
}
