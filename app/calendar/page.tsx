'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface EventType {
  id: number
  title: string
  description: string | null
  eventDate: string
  eventTime: string | null
  location: string | null
}

const staticCalendarEvents = [
  { day: 11, event: 'Orientation Day' },
  { day: 12, event: 'Orientation Day' },
  { day: 14, event: 'Resumption Day (for boarders)' },
  { day: 15, event: 'Resumption Day (for all students)' },
  { day: 17, event: '20th Valedictory Service and 20th Anniversary' },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatTime(timeStr: string | null) {
  if (!timeStr) return null
  const [hours, minutes] = timeStr.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8))
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const getEventForDay = (day: number) => {
    const staticEvent = staticCalendarEvents.find(e => e.day === day && month === 8)
    if (staticEvent) return staticEvent.event
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dbEvent = events.find(e => e.eventDate === dateStr)
    return dbEvent?.title || null
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const calendarDays = []
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isPrevMonth: true })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isPrevMonth: false, event: getEventForDay(i) })
  }
  const remaining = 42 - calendarDays.length
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isNextMonth: true })
  }

  return (
    <div className="font-sans antialiased">
      <Header currentPage="events" />

      <section
        className="relative py-24 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/32.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-calendar-alt mr-2"></i>
            Academic Calendar
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School Calendar 2025-26</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-200">
            Stay updated with important dates, events, and activities throughout the academic year.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between bg-[#a73434] text-white p-5">
                <button 
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <h3 className="text-xl font-bold">{monthNames[month]} {year}</h3>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div className="grid grid-cols-7 bg-gray-50 border-b">
                {dayNames.map((day) => (
                  <div key={day} className="text-center py-3 font-semibold text-gray-600 text-sm">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((item, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-100 ${
                      item.isPrevMonth || item.isNextMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                    }`}
                  >
                    <div className={`text-right text-sm font-medium ${
                      item.isPrevMonth || item.isNextMonth ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                      {item.day}
                    </div>
                    {item.event && (
                      <div className="mt-1">
                        <div className="bg-[#a73434]/10 text-[#a73434] text-xs rounded px-2 py-1 truncate font-medium">
                          {item.event}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
                What&apos;s Coming Up
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="section-underline"></div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No upcoming events at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start p-5 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="bg-[#a73434] text-white w-16 h-16 rounded-xl flex flex-col items-center justify-center mr-5 shrink-0">
                      <div className="text-xl font-bold">{new Date(event.eventDate).getDate()}</div>
                      <div className="text-xs">{monthNames[new Date(event.eventDate).getMonth()].slice(0, 3)}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800">{event.title}</h4>
                      {event.description && (
                        <p className="text-gray-600 mt-1">{event.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                        {event.eventTime && (
                          <span className="flex items-center">
                            <i className="fas fa-clock mr-1.5 text-[#a73434]"></i>
                            {formatTime(event.eventTime)}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center">
                            <i className="fas fa-map-marker-alt mr-1.5 text-[#a73434]"></i>
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
