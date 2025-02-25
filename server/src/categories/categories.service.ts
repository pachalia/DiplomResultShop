import {
	BadRequestException,
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Category } from '@prisma/client';
import { PaginationDto } from '../shared/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService {
	private logger = new Logger(CategoriesService.name);
	constructor(private readonly prisma: PrismaService) {}

	async create(category: string): Promise<Category> {
		if (await this.prisma.category.findFirst({ where: { name: category } })) {
			throw new ConflictException('Такая категория уже существует');
		}
		return await this.prisma.category
			.create({ data: { name: category } })
			.catch((e: Error) => {
				this.logger.error(e.message);
				return null;
			});
	}

	async getCategory(categoryPagination: PaginationDto): Promise<[Category[], number]> {
		const {
			order,
			offset: skip,
			limit: take,
		} = plainToInstance(PaginationDto, categoryPagination);
		if (order && order !== 'asc' && order !== 'desc') {
			throw new BadRequestException(
				`Нужно указать 'asc' или 'desc'. У вас указан '${order}'`,
			);
		}
		const category = await this.prisma.category.findMany({
			skip,
			take,
			orderBy: { name: order },
		});
		const count = await this.prisma.category.count();
		return [category, count];
	}

	async findCategory(category: string) {
		return await this.prisma.category.findMany({
			where: { name: { contains: category, mode: 'insensitive' } },
		});
	}

	async deleteCategory(name: string) {
		return await this.prisma.category.delete({ where: { name } });
	}

	async updateCategory(id: string, category: string): Promise<{ name: string }> {
		if (!(await this.prisma.category.findFirst({ where: { name: id } })))
			throw new NotFoundException('Категория не найдена');
		const _category = await this.prisma.category.findFirst({
			where: { name: category },
		});
		if (_category) throw new ConflictException('Такая категория уже существует');
		return await this.prisma.category.update({
			where: { name: id },
			data: { name: category },
		});
	}
}
