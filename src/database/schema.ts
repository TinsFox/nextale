import {
  boolean,
  integer,
  json,
  pgTable,
  timestamp,
  varchar,
  text,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core';
import { POST_STATUS } from '~/common/constants/post.constant';
import { PROJECT_STATUS } from '~/common/constants/project.constant';

// 定义角色枚举
export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'user',
  'editor',
  'owner',
] as const);

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  username: varchar('username', { length: 30 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  avatar: varchar('avatar', { length: 500 }),
  bio: text('bio'),
  roles: userRoleEnum('roles').array().default(['user']),
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

// 定义文章状态枚举
export const postStatusEnum = pgEnum('post_status', POST_STATUS);

export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => usersTable.id),
  coverImage: varchar('cover_image', { length: 500 }),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  summary: varchar('summary', { length: 500 }),
  viewCount: integer('view_count').default(0),
  likeCount: integer('like_count').default(0),
  commentCount: integer('comment_count').default(0),
  isCopyright: boolean('is_copyright').default(true),
  isTop: boolean('is_top').default(false),
  topOrder: integer('top_order').default(0),
  customCreatedAt: timestamp('custom_created_at'),
  customUpdatedAt: timestamp('custom_updated_at'),
  categoryIds: json('category_ids').$type<string[]>().default([]),
  tagIds: json('tag_ids').$type<string[]>().default([]),
  relatedPosts: json('related_posts').$type<string[]>().default([]),
  status: postStatusEnum('status').notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export type Post = typeof postsTable.$inferSelect;
export type CreatePost = typeof postsTable.$inferInsert;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export const tagsTable = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  description: text('description'),
  postCount: integer('post_count').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  isDeleted: boolean('is_deleted').default(false),
});

export type Tag = typeof tagsTable.$inferSelect;
export type CreateTag = typeof tagsTable.$inferInsert;

export const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  description: text('description'),
  parentId: uuid('parent_id').references(() => categoriesTable.id),
  postCount: integer('post_count').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  isDeleted: boolean('is_deleted').default(false),
});

export type Category = typeof categoriesTable.$inferSelect;
export type CreateCategory = typeof categoriesTable.$inferInsert;

export const projectStatusEnum = pgEnum('project_status', PROJECT_STATUS);

export const projectsTable = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  docsUrl: varchar('docs_url', { length: 500 }),
  github: varchar('github', { length: 500 }),
  previewUrl: varchar('preview_url', { length: 500 }),
  videoUrl: varchar('video_url', { length: 500 }),
  summary: text('summary').notNull(),
  previewImage: json('preview_image').$type<string[]>().default([]),
  readme: text('readme'),
  order: integer('order').default(0),
  coverImage: varchar('cover_image', { length: 500 }),
  status: projectStatusEnum('status').notNull().default('draft'),
  viewCount: integer('view_count').default(0),
  starCount: integer('star_count').default(0),
  techStack: json('tech_stack').$type<string[]>().default([]),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Project = typeof projectsTable.$inferSelect;
export type CreateProject = typeof projectsTable.$inferInsert;

export const dbSchema = {
  users: usersTable,
  posts: postsTable,
  tags: tagsTable,
  categories: categoriesTable,
};

export const cloudFunctionsTable = pgTable('cloud_functions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  url: varchar('url', { length: 500 }).notNull().unique(),
  code: text('code').notNull(),
  method: json('method').$type<string[]>().notNull().default([]),
  secret: varchar('secret', { length: 100 }),
  javascriptCode: text('javascript_code'),
  isActive: boolean('is_active').default(true),
  lastExecutedAt: timestamp('last_executed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type CloudFunction = typeof cloudFunctionsTable.$inferSelect;
export type NewCloudFunction = typeof cloudFunctionsTable.$inferInsert;

export const menusTable = pgTable('menus', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  parentId: uuid('parent_id').references(() => menusTable.id),
  order: integer('order').default(0),
  icon: varchar('icon', { length: 50 }),
  isVisible: boolean('is_visible').default(true),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Menu = typeof menusTable.$inferSelect;
export type NewMenu = typeof menusTable.$inferInsert;

export const pagesTable = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  url: varchar('url', { length: 500 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  content: text('content'),
  metaTitle: varchar('meta_title', { length: 200 }),
  metaDescription: text('meta_description'),
  order: integer('order').notNull().default(0),
  coverImage: varchar('cover_image', { length: 500 }),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SelectPage = typeof pagesTable.$inferSelect;
export type InsertPage = typeof pagesTable.$inferInsert;

export const socialLinksTable = pgTable('social_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  platform: varchar('platform', { length: 50 }),
  order: integer('order').default(0),
  icon: varchar('icon', { length: 50 }),
  isVisible: boolean('is_visible').default(true),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SocialLink = typeof socialLinksTable.$inferSelect;
export type NewSocialLink = typeof socialLinksTable.$inferInsert;

export const settingsTable = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: text('value').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  description: text('description'),
  group: varchar('group', { length: 50 }),
  isSystem: boolean('is_system').default(false),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Setting = typeof settingsTable.$inferSelect;
export type NewSetting = typeof settingsTable.$inferInsert;
