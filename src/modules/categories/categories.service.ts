import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DrizzleDB } from '../database/drizzle';
import { DRIZZLE } from '../database/database.module';
import { categories } from '~/database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.db.insert(categories).values(createCategoryDto).returning({
      id: categories.id,
    });
  }

  findAll() {
    return this.db.query.categories.findMany({
      where: eq(categories.isDeleted, false),
      columns: {
        isDeleted: false,
      },
    });
  }

  findOne(id: number) {
    return this.db.query.categories.findFirst({
      where: and(eq(categories.id, id), eq(categories.isDeleted, false)),
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.db
      .update(categories)
      .set(updateCategoryDto)
      .where(eq(categories.id, id));
  }

  async remove(id: number) {
    const result = await this.db
      .update(categories)
      .set({ isDeleted: true })
      .where(and(eq(categories.id, id), eq(categories.isDeleted, false)))
      .returning();
    return {
      message: 'Category deleted successfully',
      id: result[0].id,
    };
  }
}
