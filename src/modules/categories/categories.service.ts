import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DrizzleDB } from '../database/drizzle';
import { DRIZZLE } from '../database/database.module';
import { categoriesTable } from '~/database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class CategoriesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.db.insert(categoriesTable).values(createCategoryDto).returning({
      id: categoriesTable.id,
    });
  }

  findAll() {
    return this.db.query.categoriesTable.findMany({
      where: eq(categoriesTable.isDeleted, false),
      columns: {
        isDeleted: false,
      },
    });
  }

  findOne(id: string) {
    return this.db.query.categoriesTable.findFirst({
      where: and(
        eq(categoriesTable.id, id),
        eq(categoriesTable.isDeleted, false),
      ),
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.db
      .update(categoriesTable)
      .set(updateCategoryDto)
      .where(eq(categoriesTable.id, id));
  }

  async remove(id: string) {
    const result = await this.db
      .update(categoriesTable)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(
        and(eq(categoriesTable.id, id), eq(categoriesTable.isDeleted, false)),
      )
      .returning();
    return {
      message: 'Category deleted successfully',
      id: result[0].id,
    };
  }
}
