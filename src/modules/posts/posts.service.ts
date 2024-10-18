import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '~/common/dto/pagination-query.dto';
import { PaginatedResult } from '~/common/interfaces/paginated-result.interface';
import { paginateQuery } from '~/common/helpers/pagination.helper';
import { postsTable, tagsTable } from '~/database/schema';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { eq, inArray, or } from 'drizzle-orm';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const post = await this.db
      .insert(postsTable)
      .values({ ...createPostDto, authorId: userId })
      .returning({
        id: postsTable.id,
      });
    return post;
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<any>> {
    return paginateQuery(this.db, postsTable, query);
  }

  async findOne(slug: string) {
    const post = await this.db.query.postsTable.findFirst({
      where: or(eq(postsTable.slug, slug), eq(postsTable.id, parseInt(slug))),
      columns: {
        status: false,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const relatedTags = await this.db.query.tagsTable.findMany({
      where: inArray(tagsTable.id, post.tagIds ?? []),
    });
    return { ...post, tags: relatedTags };
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.db
      .update(postsTable)
      .set(updatePostDto)
      .where(eq(postsTable.id, id));
  }

  remove(id: number) {
    return this.db.delete(postsTable).where(eq(postsTable.id, id));
  }
}
