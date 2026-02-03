import { db } from '.'
import { newsTicker, events } from './schema'
import { eq, desc } from 'drizzle-orm'

export async function getActiveNewsTickerItems() {
  return db
    .select()
    .from(newsTicker)
    .where(eq(newsTicker.isActive, true))
    .orderBy(desc(newsTicker.createdAt))
}

export async function getActiveEvents(limit = 3) {
  return db
    .select()
    .from(events)
    .where(eq(events.isActive, true))
    .orderBy(desc(events.eventDate))
    .limit(limit)
}

export async function getAllEvents() {
  return db
    .select()
    .from(events)
    .where(eq(events.isActive, true))
    .orderBy(desc(events.eventDate))
}
