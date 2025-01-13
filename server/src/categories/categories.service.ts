import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(category: string): Promise<Category> {
		if (await this.prisma.category.findFirst({ where: { name: category } })) {
			return null;
		}
		return await this.prisma.category.create({ data: { name: category } });
	}

	async getCategory(): Promise<Category[]> {
		return await this.prisma.category.findMany();
	}
}
