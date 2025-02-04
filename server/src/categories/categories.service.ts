import {
	BadRequestException,
	ConflictException,
	Injectable,
	Logger,
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

	async deleteCategory(name: string) {
		return await this.prisma.category.delete({ where: { name } });
	}
}
