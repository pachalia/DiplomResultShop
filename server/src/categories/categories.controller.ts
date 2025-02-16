import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '@common/decorators';
import { PaginationDto } from '../shared/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Public()
@Controller('categories')
export class CategoriesController {
	constructor(private categoryService: CategoriesService) {}

	@Get()
	async getCategories(@Query() categoryPaginationDto: PaginationDto) {
		const categoryPagination = plainToInstance(PaginationDto, categoryPaginationDto);
		const [data, total] = await this.categoryService.getCategory(categoryPagination);
		return { ...categoryPagination, data, total };
	}

	@Post()
	async createCategory(@Body() body: { name: string }) {
		return await this.categoryService.create(body.name);
	}

	@Put()
	async updateCategory(
		@Body() body: { id: string; category: string },
	): Promise<{ name: string }> {
		return await this.categoryService.updateCategory(body.id, body.category);
	}

	@Delete(':id')
	async deleteCategory(@Param('id') id: string) {
		return await this.categoryService.deleteCategory(id);
	}
}
