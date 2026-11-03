import { eq, and, gte, lte, ilike } from 'drizzle-orm';
import { events, type Event, type NewEvent } from '../db/schema.js';
import { db } from '../db/index.js';

export async function getEvents(params: {
  type?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}): Promise<Event[]> {
  const { type, startDate, endDate, search } = params;
  const conditions = [];

  if (type) conditions.push(eq(events.type, type));
  if (startDate) conditions.push(gte(events.date, new Date(startDate)));
  if (endDate) conditions.push(lte(events.date, new Date(endDate)));
  if (search) conditions.push(ilike(events.title, `%${search}%`));

  const result = await db
    .select()
    .from(events)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(events.date);

  return result;
}

export async function getEvent(id: number): Promise<Event | undefined> {
  const [event] = await db.select().from(events).where(eq(events.id, id));
  return event;
}

export async function createEvent(data: NewEvent): Promise<Event> {
  const [event] = await db.insert(events).values(data).returning();
  return event;
}

export async function updateEvent(id: number, data: Partial<NewEvent>): Promise<Event | undefined> {
  const [event] = await db.update(events).set({ ...data, updatedAt: new Date() }).where(eq(events.id, id)).returning();
  return event;
}

export async function deleteEvent(id: number): Promise<boolean> {
  const [event] = await db.delete(events).where(eq(events.id, id)).returning();
  return !!event;
}
