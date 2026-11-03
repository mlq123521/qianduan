import { pgTable, serial, varchar, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const eventTypeEnum = pgEnum('event_type', ['feature', 'bugfix', 'doc', 'other']);

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  type: eventTypeEnum('type').notNull().default('other'),
  tags: jsonb('tags').default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
