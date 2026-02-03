import Image from 'next/image'
import Link from 'next/link'
import { getActiveEvents } from '@/lib/db/queries'
import type { Event } from '@/lib/db/schema'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function formatTime(timeStr: string | null) {
  if (!timeStr) return null
  const [hours, minutes] = timeStr.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm smooth-transition card-hover">
      <div className="relative">
        <Image
          src={event.imageUrl || '/images/43.jpeg'}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-white text-[#a73434] px-3 py-1 rounded-full text-sm font-semibold">
          {formatDate(event.eventDate)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        {event.eventTime && (
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <i className="far fa-clock mr-2"></i>
            <span>{formatTime(event.eventTime)}</span>
          </div>
        )}
        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        )}
        <button className="text-[#a73434] hover:text-[#8f2c2c] font-medium text-sm flex items-center">
          Learn More <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
    </div>
  )
}

export default async function EventsSection() {
  let events: Event[] = []
  
  try {
    events = await getActiveEvents(3)
  } catch {
    events = []
  }

  if (events.length === 0) {
    return (
      <section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              What&apos;s Happening
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <div className="section-underline mt-6"></div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming events at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
            What&apos;s Happening
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Join us for these upcoming opportunities to connect with our School.
          </p>
          <div className="section-underline mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/calendar"
            className="bg-white border-2 border-[#a73434] text-[#a73434] hover:bg-[#a73434]/5 px-8 py-3 rounded-md font-medium smooth-transition inline-block"
          >
            View Calendar
          </Link>
        </div>
      </div>
    </section>
  )
}
