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

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  username: varchar('username', { length: 256 }),
  password: varchar('password', { length: 256 }),
  avatar: varchar('avatar', { length: 256 }),
  bio: text('bio'),
  roles: json('roles').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

// 定义文章状态枚举
export const postStatusEnum = pgEnum('post_status', POST_STATUS);

export const postsTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  content: text('content'),
  authorId: integer('author_id').references(() => usersTable.id),
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
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),

  // 使用枚举定义文章状态
  status: postStatusEnum('status').default('draft'),
});

export type Post = typeof postsTable.$inferSelect;
export type CreatePost = typeof postsTable.$inferInsert;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export const tagsTable = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  isDeleted: boolean('is_deleted').default(false),
});

export type Tag = typeof tagsTable.$inferSelect;
export type CreateTag = typeof tagsTable.$inferInsert;

export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  isDeleted: boolean('is_deleted').default(false),
});

export type Category = typeof categoriesTable.$inferSelect;
export type CreateCategory = typeof categoriesTable.$inferInsert;

export const projectStatusEnum = pgEnum('project_status', PROJECT_STATUS);

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  docsUrl: varchar('docs_url', { length: 256 }),
  github: varchar('github', { length: 256 }),
  previewUrl: varchar('preview_url', { length: 256 }),
  videoUrl: varchar('video_url', { length: 256 }),
  summary: text('summary'),
  previewImage: json('preview_image').$type<string[]>().default([]),
  readme: text('readme'),
  order: integer('order').default(0),
  coverImage: varchar('cover_image', { length: 256 }),
  status: projectStatusEnum('status').default('draft'),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .$default(() => new Date()),
  techStack: json('tech_stack').$type<string[]>().default([]),
});

export type Project = typeof projectsTable.$inferSelect;
export type CreateProject = typeof projectsTable.$inferInsert;

export const dbSchema = {
  users: usersTable,
  posts: postsTable,
  tags: tagsTable,
  categories: categoriesTable,
};

const httpMethodEnum = pgEnum('http_method', ['GET', 'POST', 'PUT', 'DELETE']);

export const cloudFunctionsTable = pgTable('cloud_functions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  code: text('code').notNull(),
  method: json('method').$type<string[]>().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  secret: varchar('secret', { length: 255 }),
  javascriptCode: text('javascript_code'),
});

export type CloudFunction = typeof cloudFunctionsTable.$inferSelect;
export type NewCloudFunction = typeof cloudFunctionsTable.$inferInsert;

export const menusTable = pgTable('menus', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  order: integer('order').default(0),
  icon: varchar('icon', { length: 255 }),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Menu = typeof menusTable.$inferSelect;
export type NewMenu = typeof menusTable.$inferInsert;

export const pagesTable = pgTable('pages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  content: text('content'),
  order: integer('order').notNull().default(0),
  coverImage: varchar('cover_image', { length: 255 }),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectPage = typeof pagesTable.$inferSelect;
export type InsertPage = typeof pagesTable.$inferInsert;

export const socialLinksTable = pgTable('social_links', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull().unique(),
  order: integer('order').default(0),
  icon: varchar('icon', { length: 255 }),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SocialLink = typeof socialLinksTable.$inferSelect;
export type NewSocialLink = typeof socialLinksTable.$inferInsert;

export const settingsTable = pgTable('settings', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  value: text('value').notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Setting = typeof settingsTable.$inferSelect;
export type NewSetting = typeof settingsTable.$inferInsert;
