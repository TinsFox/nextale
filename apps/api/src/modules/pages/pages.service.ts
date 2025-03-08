import { Inject, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { pagesTable } from 'apps/api/src/database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PagesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createPageDto: CreatePageDto) {
    return this.db.insert(pagesTable).values(createPageDto);
  }

  findAll() {
    return this.db.query.pagesTable.findMany({
      where: eq(pagesTable.isDeleted, false),
      columns: {
        isDeleted: false,
      },
    });
  }

  findOne(id: string) {
    return this.db.query.pagesTable.findFirst({
      where: and(eq(pagesTable.id, id), eq(pagesTable.isDeleted, false)),
    });
  }

  update(id: string, updatePageDto: UpdatePageDto) {
    return this.db
      .update(pagesTable)
      .set(updatePageDto)
      .where(eq(pagesTable.id, id));
  }

  remove(id: string) {
    return this.db
      .update(pagesTable)
      .set({
        isDeleted: true,
      })
      .where(eq(pagesTable.id, id));
  }
}
