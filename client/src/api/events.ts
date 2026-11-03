export interface Event {
  id: number
  title: string
  description: string | null
  date: string
  type: 'feature' | 'bugfix' | 'doc' | 'other'
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface EventFilter {
  type?: string
  startDate?: string
  endDate?: string
  search?: string
}

const API_BASE = '/api'

export async function fetchEvents(filter?: EventFilter): Promise<Event[]> {
  const params = new URLSearchParams()
  if (filter?.type) params.set('type', filter.type)
  if (filter?.startDate) params.set('startDate', filter.startDate)
  if (filter?.endDate) params.set('endDate', filter.endDate)
  if (filter?.search) params.set('search', filter.search)

  const res = await fetch(`${API_BASE}/events?${params}`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function createEvent(data: Partial<Event>): Promise<Event> {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create event')
  return res.json()
}

export async function updateEvent(id: number, data: Partial<Event>): Promise<Event> {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update event')
  return res.json()
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete event')
}
