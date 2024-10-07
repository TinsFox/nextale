import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { tagsTable } from '~/database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class TagsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createTagDto: CreateTagDto) {
    return this.db.insert(tagsTable).values(createTagDto);
  }

  findAll() {
    return this.db.query.tagsTable.findMany({
      where: eq(tagsTable.isDeleted, false),
      columns: {
        isDeleted: false,
      },
    });
  }

  findOne(id: number) {
    return this.db.query.tagsTable.findFirst({
      where: and(eq(tagsTable.id, id), eq(tagsTable.isDeleted, false)),
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.db
      .update(tagsTable)
      .set(updateTagDto)
      .where(eq(tagsTable.id, id));
  }

  remove(id: number) {
    return this.db
      .update(tagsTable)
      .set({ isDeleted: true })
      .where(eq(tagsTable.id, id));
  }
}
