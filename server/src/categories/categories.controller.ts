import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '@common/decorators';

@Public()
@Controller('categories')
export class CategoriesController {
	constructor(private categoryService: CategoriesService) {}

	@Get()
	getCategories() {
		return this.categoryService.getCategory();
	}

	@Post()
	createCategory(@Body() body: { name: string }) {
		return this.categoryService.create(body.name);
	}
}
