import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { posts, users } from './schema';
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id),
  content: varchar('content', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
});

export type Comment = typeof comments.$inferSelect; // return type when queried
export type CreateComment = typeof comments.$inferInsert; // insert type

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Like = typeof likes.$inferSelect; // return type when queried
export type CreateLike = typeof likes.$inferInsert; // insert type

export const collects = pgTable('collects', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Collect = typeof collects.$inferSelect; // return type when queried
export type CreateCollect = typeof collects.$inferInsert; // insert type
