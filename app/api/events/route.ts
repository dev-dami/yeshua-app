import { NextResponse } from 'next/server'
import { getActiveEvents } from '@/lib/db/queries'

export async function GET() {
  try {
    const events = await getActiveEvents(3)
    return NextResponse.json(events)
  } catch {
    return NextResponse.json([
      {
        id: 1,
        title: 'Cultural Day',
        description: 'The Valedictory Service and Anniversary celebration is a remarkable event.',
        eventDate: '2025-09-17',
        eventTime: '10:00',
        imageUrl: '/images/43.jpeg',
      },
      {
        id: 2,
        title: 'Talent Hunt',
        description: 'Celebrate student innovation at our science fair.',
        eventDate: '2025-07-19',
        eventTime: '09:00',
        imageUrl: '/images/41.jpeg',
      },
      {
        id: 3,
        title: 'Musical Display',
        description: 'Showcasing the students\' musical talents.',
        eventDate: '2025-07-19',
        eventTime: '14:00',
        imageUrl: '/images/music 1.jpeg',
      },
    ])
  }
}
