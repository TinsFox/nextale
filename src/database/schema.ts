import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  username: varchar('username', { length: 256 }),
  password: varchar('password', { length: 256 }),
  roles: json('roles').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;

// 定义文章状态枚举
export const postStatusEnum = pgEnum('post_status', [
  'draft',
  'published',
  'archived',
  'under_review',
]);

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  coverImage: varchar('cover_image', { length: 256 }),
  tags: json('tags').$type<string[]>().default([]),
  // 是否开启版权注明
  isCopyright: boolean('is_copyright').default(false),
  // 置顶
  isTop: boolean('is_top').default(false),
  // 置顶顺序
  topOrder: integer('top_order').default(0),
  // 摘要
  summary: varchar('summary', { length: 256 }),
  // 自定义创建时间
  customCreatedAt: timestamp('custom_created_at'),
  // 自定义更新时间
  customUpdatedAt: timestamp('custom_updated_at'),
  // 关联文章
  relatedPosts: json('related_posts').$type<string[]>().default([]),
  // 分类
  category: varchar('category', { length: 256 }),
  slug: varchar('slug', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
  isPublished: boolean('is_published').default(false),
  // 使用枚举定义文章状态
  status: postStatusEnum('status').default('draft'),
});

export type Post = typeof posts.$inferSelect; // return type when queried
export type CreatePost = typeof posts.$inferInsert; // insert type
