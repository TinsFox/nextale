import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { tags } from '~/database/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class TagsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createTagDto: CreateTagDto) {
    return this.db.insert(tags).values(createTagDto);
  }

  findAll() {
    return this.db.query.tags.findMany({
      where: eq(tags.isDeleted, false),
      columns: {
        isDeleted: false,
      },
    });
  }

  findOne(id: number) {
    return this.db.query.tags.findFirst({
      where: and(eq(tags.id, id), eq(tags.isDeleted, false)),
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.db.update(tags).set(updateTagDto).where(eq(tags.id, id));
  }

  remove(id: number) {
    return this.db.update(tags).set({ isDeleted: true }).where(eq(tags.id, id));
  }
}
