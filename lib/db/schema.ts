import { pgTable, serial, text, timestamp, boolean, date, time } from 'drizzle-orm/pg-core'

export const newsTicker = pgTable('news_ticker', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  eventDate: date('event_date').notNull(),
  eventTime: time('event_time'),
  location: text('location'),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const awards = pgTable('awards', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  awardDate: date('award_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const teachers = pgTable('teachers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type NewsTicker = typeof newsTicker.$inferSelect
export type InsertNewsTicker = typeof newsTicker.$inferInsert
export type Event = typeof events.$inferSelect
export type InsertEvent = typeof events.$inferInsert
export type Award = typeof awards.$inferSelect
export type InsertAward = typeof awards.$inferInsert
export type Teacher = typeof teachers.$inferSelect
export type InsertTeacher = typeof teachers.$inferInsert
