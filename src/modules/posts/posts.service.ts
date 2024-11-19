import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '~/common/dto/pagination-query.dto';
import { PaginatedResult } from '~/common/interfaces/paginated-result.interface';
import { paginateQuery } from '~/common/helpers/pagination.helper';
import { postsTable, tagsTable } from '~/database/schema';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { and, eq, inArray } from 'drizzle-orm';

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

  async findOneById(id: number) {
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

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log('updatePostDto: ', updatePostDto);
    return this.db
      .update(postsTable)
      .set({
        title: updatePostDto.title,
        content: updatePostDto.content,
        coverImage: updatePostDto.coverImage,
        tagIds: updatePostDto.tags?.map((tag) => +tag),
        status: updatePostDto.status,
        slug: updatePostDto.slug,
        isTop: updatePostDto.isTop,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, id));
  }

  remove(id: number) {
    return this.db.delete(postsTable).where(eq(postsTable.id, id));
  }
}
