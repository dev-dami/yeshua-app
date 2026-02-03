'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Section = 'dashboard' | 'events' | 'news'

interface NewsItem {
  id: number
  message: string
  is_active: boolean
  created_at: string
}

interface EventItem {
  id: number
  title: string
  description: string | null
  eventDate: string
  eventTime: string | null
  location: string | null
  imageUrl: string | null
  isActive: boolean
  createdAt: string
}

interface Toast {
  message: string
  type: 'success' | 'error'
}

export default function AdminPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [toast, setToast] = useState<Toast | null>(null)
  
  // News state
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  
  // Events state
  const [events, setEvents] = useState<EventItem[]>([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
    image_url: ''
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
    router.refresh()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
    setImageUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setEventForm({ ...eventForm, image_url: data.url })
        showToast('Image uploaded successfully', 'success')
      } else {
        const errorData = await res.json()
        showToast(errorData.error || 'Failed to upload image', 'error')
        setImagePreview(null)
      }
    } catch {
      showToast('Failed to upload image', 'error')
      setImagePreview(null)
    } finally {
      setImageUploading(false)
    }
  }

  const clearImagePreview = () => {
    setImagePreview(null)
    setEventForm({ ...eventForm, image_url: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    setCurrentDate(new Date().toLocaleDateString('en-US', options))
  }, [])

  // Fetch news
  const fetchNews = useCallback(async () => {
    setNewsLoading(true)
    try {
      const res = await fetch('/api/news-ticker')
      const data = await res.json()
      setNewsItems(data)
    } catch {
      showToast('Failed to fetch news', 'error')
    } finally {
      setNewsLoading(false)
    }
  }, [])

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setEventsLoading(true)
    try {
      const res = await fetch('/api/events?all=true')
      const data = await res.json()
      setEvents(data)
    } catch {
      showToast('Failed to fetch events', 'error')
    } finally {
      setEventsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
    fetchEvents()
  }, [fetchNews, fetchEvents])

  // News CRUD
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const res = await fetch('/api/news-ticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      })
      if (res.ok) {
        showToast('News added successfully', 'success')
        setNewMessage('')
        fetchNews()
      } else {
        showToast('Failed to add news', 'error')
      }
    } catch {
      showToast('Failed to add news', 'error')
    }
  }

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingNews) return

    try {
      const res = await fetch('/api/news-ticker', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingNews.id, message: editingNews.message })
      })
      if (res.ok) {
        showToast('News updated successfully', 'success')
        setEditingNews(null)
        fetchNews()
      } else {
        showToast('Failed to update news', 'error')
      }
    } catch {
      showToast('Failed to update news', 'error')
    }
  }

  const handleToggleNews = async (item: NewsItem) => {
    try {
      const res = await fetch('/api/news-ticker', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: !item.is_active })
      })
      if (res.ok) {
        showToast(`News ${item.is_active ? 'deactivated' : 'activated'}`, 'success')
        fetchNews()
      }
    } catch {
      showToast('Failed to update status', 'error')
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news item?')) return

    try {
      const res = await fetch(`/api/news-ticker?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('News deleted successfully', 'success')
        fetchNews()
      } else {
        showToast('Failed to delete news', 'error')
      }
    } catch {
      showToast('Failed to delete news', 'error')
    }
  }

  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      event_date: '',
      event_time: '',
      location: '',
      image_url: ''
    })
    setEditingEvent(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventForm.title.trim() || !eventForm.event_date) {
      showToast('Title and date are required', 'error')
      return
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm)
      })
      if (res.ok) {
        showToast('Event created successfully', 'success')
        resetEventForm()
        fetchEvents()
      } else {
        showToast('Failed to create event', 'error')
      }
    } catch {
      showToast('Failed to create event', 'error')
    }
  }

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return

    try {
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingEvent.id,
          title: eventForm.title,
          description: eventForm.description,
          event_date: eventForm.event_date,
          event_time: eventForm.event_time,
          location: eventForm.location,
          image_url: eventForm.image_url
        })
      })
      if (res.ok) {
        showToast('Event updated successfully', 'success')
        resetEventForm()
        fetchEvents()
      } else {
        showToast('Failed to update event', 'error')
      }
    } catch {
      showToast('Failed to update event', 'error')
    }
  }

  const handleEditEvent = (event: EventItem) => {
    setEditingEvent(event)
    setEventForm({
      title: event.title,
      description: event.description || '',
      event_date: event.eventDate,
      event_time: event.eventTime || '',
      location: event.location || '',
      image_url: event.imageUrl || ''
    })
    setImagePreview(event.imageUrl || null)
  }

  const handleToggleEvent = async (event: EventItem) => {
    try {
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: event.id, is_active: !event.isActive })
      })
      if (res.ok) {
        showToast(`Event ${event.isActive ? 'deactivated' : 'activated'}`, 'success')
        fetchEvents()
      }
    } catch {
      showToast('Failed to update status', 'error')
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showToast('Event deleted successfully', 'success')
        fetchEvents()
      } else {
        showToast('Failed to delete event', 'error')
      }
    } catch {
      showToast('Failed to delete event', 'error')
    }
  }

  const navItems = [
    { id: 'dashboard' as Section, label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'events' as Section, label: 'Events', icon: 'fa-calendar-alt' },
    { id: 'news' as Section, label: 'News Ticker', icon: 'fa-newspaper' },
  ]

  const activeNewsCount = newsItems.filter(n => n.is_active).length
  const activeEventsCount = events.filter(e => e.isActive).length

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          <div className="flex items-center gap-2">
            <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {toast.message}
          </div>
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`sidebar bg-white shadow-xl flex-col h-full fixed md:relative z-20 ${
          sidebarOpen ? 'flex' : 'hidden md:flex'
        }`}>
          <div className="p-6 border-b flex items-center gap-3">
            <Image src="/images/images-removebg-preview.png" alt="Logo" width={40} height={40} />
            <div>
              <h1 className="font-bold text-lg text-gray-800">Yeshua High</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition ${
                      activeSection === item.id
                        ? 'bg-[#a73434] text-white'
                        : 'text-gray-600 hover:bg-red-50 hover:text-[#a73434]'
                    }`}
                  >
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#a73434] hover:bg-red-50 smooth-transition font-medium"
            >
              <i className="fas fa-arrow-left w-5 text-center"></i>
              <span>Back to Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 smooth-transition font-medium"
            >
              <i className="fas fa-sign-out-alt w-5 text-center"></i>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto w-full relative">
          {/* Mobile Header */}
          <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <Image src="/images/images-removebg-preview.png" alt="Logo" width={32} height={32} />
              <span className="font-bold text-gray-800">Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </header>

          <div className="p-6 lg:p-10 max-w-6xl mx-auto pb-20">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                  <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    <i className="far fa-clock mr-1"></i> {currentDate}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#a73434]">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total News</p>
                        <h3 className="text-3xl font-bold text-gray-800">{newsItems.length}</h3>
                      </div>
                      <div className="bg-red-100 p-2 rounded-lg text-[#a73434]">
                        <i className="fas fa-newspaper"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Active News</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeNewsCount}</h3>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Events</p>
                        <h3 className="text-3xl font-bold text-gray-800">{events.length}</h3>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Active Events</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeEventsCount}</h3>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveSection('events')}
                        className="p-4 rounded-lg bg-[#a73434]/10 border border-[#a73434]/20 flex flex-col items-center justify-center gap-2 hover:bg-[#a73434]/20 smooth-transition group"
                      >
                        <i className="fas fa-calendar-plus text-2xl text-[#a73434] group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Create Event</span>
                      </button>
                      <button
                        onClick={() => setActiveSection('news')}
                        className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 smooth-transition group"
                      >
                        <i className="fas fa-bullhorn text-2xl text-blue-500 group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Add News</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Recent News</h3>
                    <div className="space-y-3">
                      {newsItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${item.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <p className="text-sm text-gray-700 truncate flex-1">{item.message}</p>
                        </div>
                      ))}
                      {newsItems.length === 0 && (
                        <p className="text-gray-500 text-sm">No news items yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Events Management */}
            {activeSection === 'events' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
                
                {/* Event Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>
                  <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                          type="text"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g., Cultural Day"
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          value={eventForm.event_date}
                          onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="time"
                          value={eventForm.event_time}
                          onChange={(e) => setEventForm({ ...eventForm, event_time: e.target.value })}
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          placeholder="e.g., School Hall"
                          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                      <div className="space-y-3">
                        {imagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-32 w-auto rounded-lg object-cover border"
                            />
                            <button
                              type="button"
                              onClick={clearImagePreview}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                            <i className="fas fa-cloud-upload-alt"></i>
                            {imageUploading ? 'Uploading...' : 'Upload Image'}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={handleImageUpload}
                              disabled={imageUploading}
                              className="hidden"
                            />
                          </label>
                          {imageUploading && (
                            <div className="w-5 h-5 border-2 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Accepts JPEG, PNG, WebP, GIF. Max 5MB.</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        rows={3}
                        placeholder="Event description..."
                        className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                      ></textarea>
                    </div>
                    <div className="flex gap-3 justify-end">
                      {editingEvent && (
                        <button
                          type="button"
                          onClick={resetEventForm}
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 smooth-transition"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c] smooth-transition"
                      >
                        {editingEvent ? 'Update Event' : 'Create Event'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Events List */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Events</h3>
                  {eventsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : events.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No events yet. Create your first event above.</p>
                  ) : (
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#a73434]">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-800">{event.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                event.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {event.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {new Date(event.eventDate).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                              {event.eventTime && ` at ${event.eventTime}`}
                            </p>
                            {event.description && (
                              <p className="text-sm text-gray-500 mt-1 truncate">{event.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleEvent(event)}
                              className={`p-2 rounded-lg smooth-transition ${
                                event.isActive 
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                              }`}
                              title={event.isActive ? 'Deactivate' : 'Activate'}
                            >
                              <i className={`fas ${event.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </button>
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 smooth-transition"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 smooth-transition"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* News Ticker Management */}
            {activeSection === 'news' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage News Ticker</h2>
                
                {/* Add News Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Add New Message</h3>
                  <form onSubmit={handleAddNews} className="space-y-4">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter news ticker message..."
                        className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c] smooth-transition whitespace-nowrap"
                      >
                        <i className="fas fa-plus mr-2"></i>Add
                      </button>
                    </div>
                  </form>
                </div>

                {/* Edit Modal */}
                {editingNews && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-[#a73434]">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Edit Message</h3>
                    <form onSubmit={handleUpdateNews} className="space-y-4">
                      <input
                        type="text"
                        value={editingNews.message}
                        onChange={(e) => setEditingNews({ ...editingNews, message: e.target.value })}
                        className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none"
                      />
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingNews(null)}
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 smooth-transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c] smooth-transition"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* News List */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Messages</h3>
                  {newsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : newsItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No news messages yet. Add your first message above.</p>
                  ) : (
                    <div className="space-y-3">
                      {newsItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800">{item.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Created: {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleNews(item)}
                              className={`p-2 rounded-lg smooth-transition ${
                                item.is_active 
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                              }`}
                              title={item.is_active ? 'Deactivate' : 'Activate'}
                            >
                              <i className={`fas ${item.is_active ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </button>
                            <button
                              onClick={() => setEditingNews(item)}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 smooth-transition"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 smooth-transition"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div className="bg-gray-900 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">Live Preview:</p>
                  <div className="overflow-hidden">
                    <p className="text-white whitespace-nowrap animate-pulse">
                      {newsItems.filter(n => n.is_active).map(n => n.message).join(' | ') || 'No active messages'}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
