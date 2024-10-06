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
import { POST_STATUS } from '~/common/constants/post.constant';
import { PROJECT_STATUS } from '~/common/constants/project.constant';

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
export const postStatusEnum = pgEnum('post_status', POST_STATUS);

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  coverImage: varchar('cover_image', { length: 256 }),
  tags: json('tags').$type<string[]>().default([]),
  // 是否开启版权注明
  isCopyright: boolean('is_copyright').default(true),
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
  categoryIds: json('category_ids').$type<number[]>().default([]),
  // 标签
  tagIds: json('tag_ids').$type<number[]>().default([]),

  slug: varchar('slug', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),

  // 使用枚举定义文章状态
  status: postStatusEnum('status').default('draft'),
});

export type Post = typeof posts.$inferSelect; // return type when queried
export type CreatePost = typeof posts.$inferInsert; // insert type

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
});

export type Tag = typeof tags.$inferSelect; // return type when queried
export type CreateTag = typeof tags.$inferInsert; // insert type

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
});

export type Category = typeof categories.$inferSelect; // return type when queried
export type CreateCategory = typeof categories.$inferInsert; // insert type

export const projectStatusEnum = pgEnum('project_status', PROJECT_STATUS);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  docsUrl: varchar('docs_url', { length: 256 }),
  previewUrl: varchar('preview_url', { length: 256 }),
  videoUrl: varchar('video_url', { length: 256 }),
  summary: text('summary'),
  previewImage: json('preview_image').$type<string[]>().default([]),
  readme: text('readme'),
  order: integer('order').default(0),
  coverImage: varchar('cover_image', { length: 256 }),
  status: projectStatusEnum('status').default('draft'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  techStack: json('tech_stack').$type<string[]>().default([]),
});

export type Project = typeof projects.$inferSelect;
export type CreateProject = typeof projects.$inferInsert;

export const dbSchema = {
  users,
  posts,
  tags,
  categories,
};

const httpMethodEnum = pgEnum('http_method', ['GET', 'POST', 'PUT', 'DELETE']);

export const cloudFunctions = pgTable('cloud_functions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  code: text('code').notNull(),
  method: json('method').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  secret: varchar('secret', { length: 255 }),
  javascriptCode: text('javascript_code'),
});

export type CloudFunction = typeof cloudFunctions.$inferSelect;
export type NewCloudFunction = typeof cloudFunctions.$inferInsert;
