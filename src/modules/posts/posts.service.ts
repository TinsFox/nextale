import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '~/common/dto/pagination-query.dto';
import { PaginatedResult } from '~/common/interfaces/paginated-result.interface';
import { postsTable, tagsTable } from '~/database/schema';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { and, count, eq, inArray, desc } from 'drizzle-orm';

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10 } = query;

    const offset = (page - 1) * limit;
    const dbQuery = this.db
      .select()
      .from(postsTable)
      .where(eq(postsTable.status, 'published'))
      .offset(offset)
      .limit(limit)
      .orderBy(desc(postsTable.createdAt));

    const totalQuery = this.db.select({ count: count() }).from(postsTable);

    const [data, [{ count: total }]] = await Promise.all([dbQuery, totalQuery]);

    return {
      records: data,
      meta: {
        pagination: {
          total: Number(total),
          page,
          pageSize: limit,
          pageCount: Math.ceil(Number(total) / limit),
        },
      },
    };
  }
  async findOneBySlug(slug: string) {
    const post = await this.db.query.postsTable.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.status, 'published')),
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

  async findOneById(id: string) {
    const post = await this.db.query.postsTable.findFirst({
      where: eq(postsTable.id, id),
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

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.db
      .update(postsTable)
      .set({
        title: updatePostDto.title,
        content: updatePostDto.content,
        coverImage: updatePostDto.coverImage,
        tagIds: updatePostDto.tags?.map((tag) => tag),
        status: updatePostDto.status,
        slug: updatePostDto.slug,
        isTop: updatePostDto.isTop,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, id));
  }

  remove(id: string) {
    return this.db.delete(postsTable).where(eq(postsTable.id, id));
  }
}
