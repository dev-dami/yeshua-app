'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Section = 'dashboard' | 'events' | 'news' | 'awards' | 'teachers' | 'gallery'

interface NewsItem {
  id: number
  message: string
  isActive: boolean
  createdAt: string
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

interface AwardItem {
  id: number
  title: string
  description: string | null
  category: string
  imageUrl: string | null
  awardDate: string | null
  isActive: boolean
  createdAt: string
}

interface TeacherItem {
  id: number
  name: string
  role: string
  imageUrl: string | null
  isActive: boolean
  createdAt: string
}

interface GalleryItem {
  id: number
  title: string | null
  imageUrl: string
  category: string | null
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
  const teacherFileInputRef = useRef<HTMLInputElement>(null)
  const awardFileInputRef = useRef<HTMLInputElement>(null)
  const galleryFileInputRef = useRef<HTMLInputElement>(null)
  
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [toast, setToast] = useState<Toast | null>(null)
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  
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

  const [awards, setAwards] = useState<AwardItem[]>([])
  const [awardsLoading, setAwardsLoading] = useState(false)
  const [editingAward, setEditingAward] = useState<AwardItem | null>(null)
  const [awardImageUploading, setAwardImageUploading] = useState(false)
  const [awardImagePreview, setAwardImagePreview] = useState<string | null>(null)
  const [awardForm, setAwardForm] = useState({
    title: '',
    description: '',
    category: '',
    award_date: '',
    image_url: ''
  })

  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [teachersLoading, setTeachersLoading] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null)
  const [teacherImageUploading, setTeacherImageUploading] = useState(false)
  const [teacherImagePreview, setTeacherImagePreview] = useState<string | null>(null)
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    role: '',
    image_url: ''
  })

  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
    router.refresh()
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (res.ok) {
      const data = await res.json()
      return data.url
    }
    return null
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setImageUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        setEventForm({ ...eventForm, image_url: url })
        showToast('Image uploaded successfully', 'success')
      } else {
        showToast('Failed to upload image', 'error')
        setImagePreview(null)
      }
    } catch {
      showToast('Failed to upload image', 'error')
      setImagePreview(null)
    } finally {
      setImageUploading(false)
    }
  }

  const handleAwardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAwardImagePreview(URL.createObjectURL(file))
    setAwardImageUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        setAwardForm({ ...awardForm, image_url: url })
        showToast('Image uploaded successfully', 'success')
      } else {
        showToast('Failed to upload image', 'error')
        setAwardImagePreview(null)
      }
    } catch {
      showToast('Failed to upload image', 'error')
      setAwardImagePreview(null)
    } finally {
      setAwardImageUploading(false)
    }
  }

  const handleTeacherImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setTeacherImagePreview(URL.createObjectURL(file))
    setTeacherImageUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        setTeacherForm({ ...teacherForm, image_url: url })
        showToast('Photo uploaded successfully', 'success')
      } else {
        showToast('Failed to upload photo', 'error')
        setTeacherImagePreview(null)
      }
    } catch {
      showToast('Failed to upload photo', 'error')
      setTeacherImagePreview(null)
    } finally {
      setTeacherImageUploading(false)
    }
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setGalleryUploading(true)
    let uploaded = 0
    for (const file of Array.from(files)) {
      try {
        const url = await uploadImage(file)
        if (url) {
          await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_url: url, title: file.name.split('.')[0] })
          })
          uploaded++
        }
      } catch { }
    }
    setGalleryUploading(false)
    if (uploaded > 0) {
      showToast(`${uploaded} image(s) uploaded`, 'success')
      fetchGallery()
    }
    if (galleryFileInputRef.current) galleryFileInputRef.current.value = ''
  }

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }))
  }, [])

  const fetchNews = useCallback(async () => {
    setNewsLoading(true)
    try {
      const res = await fetch('/api/news-ticker')
      setNewsItems(await res.json())
    } catch { showToast('Failed to fetch news', 'error') }
    finally { setNewsLoading(false) }
  }, [])

  const fetchEvents = useCallback(async () => {
    setEventsLoading(true)
    try {
      const res = await fetch('/api/events?all=true')
      setEvents(await res.json())
    } catch { showToast('Failed to fetch events', 'error') }
    finally { setEventsLoading(false) }
  }, [])

  const fetchAwards = useCallback(async () => {
    setAwardsLoading(true)
    try {
      const res = await fetch('/api/awards?all=true')
      setAwards(await res.json())
    } catch { showToast('Failed to fetch awards', 'error') }
    finally { setAwardsLoading(false) }
  }, [])

  const fetchTeachers = useCallback(async () => {
    setTeachersLoading(true)
    try {
      const res = await fetch('/api/teachers?all=true')
      setTeachers(await res.json())
    } catch { showToast('Failed to fetch teachers', 'error') }
    finally { setTeachersLoading(false) }
  }, [])

  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch('/api/gallery?all=true')
      setGallery(await res.json())
    } catch { showToast('Failed to fetch gallery', 'error') }
    finally { setGalleryLoading(false) }
  }, [])

  useEffect(() => {
    fetchNews()
    fetchEvents()
    fetchAwards()
    fetchTeachers()
    fetchGallery()
  }, [fetchNews, fetchEvents, fetchAwards, fetchTeachers, fetchGallery])

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    try {
      const res = await fetch('/api/news-ticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      })
      if (res.ok) { showToast('News added', 'success'); setNewMessage(''); fetchNews() }
      else showToast('Failed to add news', 'error')
    } catch { showToast('Failed to add news', 'error') }
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
      if (res.ok) { showToast('News updated', 'success'); setEditingNews(null); fetchNews() }
      else showToast('Failed to update', 'error')
    } catch { showToast('Failed to update', 'error') }
  }

  const handleToggleNews = async (item: NewsItem) => {
    try {
      const res = await fetch('/api/news-ticker', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: !item.isActive })
      })
      if (res.ok) { showToast(`News ${item.isActive ? 'deactivated' : 'activated'}`, 'success'); fetchNews() }
    } catch { showToast('Failed to update', 'error') }
  }

  const handleDeleteNews = async (id: number) => {
    if (!confirm('Delete this news item?')) return
    try {
      const res = await fetch(`/api/news-ticker?id=${id}`, { method: 'DELETE' })
      if (res.ok) { showToast('News deleted', 'success'); fetchNews() }
      else showToast('Failed to delete', 'error')
    } catch { showToast('Failed to delete', 'error') }
  }

  const resetEventForm = () => {
    setEventForm({ title: '', description: '', event_date: '', event_time: '', location: '', image_url: '' })
    setEditingEvent(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventForm.title.trim() || !eventForm.event_date) { showToast('Title and date required', 'error'); return }
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm)
      })
      if (res.ok) { showToast('Event created', 'success'); resetEventForm(); fetchEvents() }
      else showToast('Failed to create', 'error')
    } catch { showToast('Failed to create', 'error') }
  }

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return
    try {
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingEvent.id, ...eventForm })
      })
      if (res.ok) { showToast('Event updated', 'success'); resetEventForm(); fetchEvents() }
      else showToast('Failed to update', 'error')
    } catch { showToast('Failed to update', 'error') }
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
      if (res.ok) { showToast(`Event ${event.isActive ? 'deactivated' : 'activated'}`, 'success'); fetchEvents() }
    } catch { showToast('Failed to update', 'error') }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' })
      if (res.ok) { showToast('Event deleted', 'success'); fetchEvents() }
      else showToast('Failed to delete', 'error')
    } catch { showToast('Failed to delete', 'error') }
  }

  const resetAwardForm = () => {
    setAwardForm({ title: '', description: '', category: '', award_date: '', image_url: '' })
    setEditingAward(null)
    setAwardImagePreview(null)
    if (awardFileInputRef.current) awardFileInputRef.current.value = ''
  }

  const handleAddAward = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!awardForm.title.trim() || !awardForm.category.trim()) { showToast('Title and category required', 'error'); return }
    try {
      const res = await fetch('/api/awards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(awardForm)
      })
      if (res.ok) { showToast('Award created', 'success'); resetAwardForm(); fetchAwards() }
      else showToast('Failed to create', 'error')
    } catch { showToast('Failed to create', 'error') }
  }

  const handleUpdateAward = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAward) return
    try {
      const res = await fetch('/api/awards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingAward.id, ...awardForm })
      })
      if (res.ok) { showToast('Award updated', 'success'); resetAwardForm(); fetchAwards() }
      else showToast('Failed to update', 'error')
    } catch { showToast('Failed to update', 'error') }
  }

  const handleEditAward = (award: AwardItem) => {
    setEditingAward(award)
    setAwardForm({
      title: award.title,
      description: award.description || '',
      category: award.category,
      award_date: award.awardDate || '',
      image_url: award.imageUrl || ''
    })
    setAwardImagePreview(award.imageUrl || null)
  }

  const handleToggleAward = async (award: AwardItem) => {
    try {
      const res = await fetch('/api/awards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: award.id, is_active: !award.isActive })
      })
      if (res.ok) { showToast(`Award ${award.isActive ? 'deactivated' : 'activated'}`, 'success'); fetchAwards() }
    } catch { showToast('Failed to update', 'error') }
  }

  const handleDeleteAward = async (id: number) => {
    if (!confirm('Delete this award?')) return
    try {
      const res = await fetch(`/api/awards?id=${id}`, { method: 'DELETE' })
      if (res.ok) { showToast('Award deleted', 'success'); fetchAwards() }
      else showToast('Failed to delete', 'error')
    } catch { showToast('Failed to delete', 'error') }
  }

  const resetTeacherForm = () => {
    setTeacherForm({ name: '', role: '', image_url: '' })
    setEditingTeacher(null)
    setTeacherImagePreview(null)
    if (teacherFileInputRef.current) teacherFileInputRef.current.value = ''
  }

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teacherForm.name.trim() || !teacherForm.role.trim()) { showToast('Name and role required', 'error'); return }
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherForm)
      })
      if (res.ok) { showToast('Teacher added', 'success'); resetTeacherForm(); fetchTeachers() }
      else showToast('Failed to add', 'error')
    } catch { showToast('Failed to add', 'error') }
  }

  const handleUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTeacher) return
    try {
      const res = await fetch('/api/teachers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingTeacher.id, ...teacherForm })
      })
      if (res.ok) { showToast('Teacher updated', 'success'); resetTeacherForm(); fetchTeachers() }
      else showToast('Failed to update', 'error')
    } catch { showToast('Failed to update', 'error') }
  }

  const handleEditTeacher = (teacher: TeacherItem) => {
    setEditingTeacher(teacher)
    setTeacherForm({
      name: teacher.name,
      role: teacher.role,
      image_url: teacher.imageUrl || ''
    })
    setTeacherImagePreview(teacher.imageUrl || null)
  }

  const handleToggleTeacher = async (teacher: TeacherItem) => {
    try {
      const res = await fetch('/api/teachers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: teacher.id, is_active: !teacher.isActive })
      })
      if (res.ok) { showToast(`Teacher ${teacher.isActive ? 'hidden' : 'shown'}`, 'success'); fetchTeachers() }
    } catch { showToast('Failed to update', 'error') }
  }

  const handleDeleteTeacher = async (id: number) => {
    if (!confirm('Delete this teacher?')) return
    try {
      const res = await fetch(`/api/teachers?id=${id}`, { method: 'DELETE' })
      if (res.ok) { showToast('Teacher deleted', 'success'); fetchTeachers() }
      else showToast('Failed to delete', 'error')
    } catch { showToast('Failed to delete', 'error') }
  }

  const handleToggleGallery = async (item: GalleryItem) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: !item.isActive })
      })
      if (res.ok) { showToast(`Image ${item.isActive ? 'hidden' : 'shown'}`, 'success'); fetchGallery() }
    } catch { showToast('Failed to update', 'error') }
  }

  const handleDeleteGallery = async (id: number) => {
    if (!confirm('Delete this image?')) return
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) { showToast('Image deleted', 'success'); fetchGallery() }
      else showToast('Failed to delete', 'error')
    } catch { showToast('Failed to delete', 'error') }
  }

  const navItems = [
    { id: 'dashboard' as Section, label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'events' as Section, label: 'Events', icon: 'fa-calendar-alt' },
    { id: 'news' as Section, label: 'News Ticker', icon: 'fa-newspaper' },
    { id: 'awards' as Section, label: 'Awards', icon: 'fa-trophy' },
    { id: 'teachers' as Section, label: 'Teachers', icon: 'fa-chalkboard-teacher' },
    { id: 'gallery' as Section, label: 'Gallery', icon: 'fa-images' },
  ]

  const activeNewsCount = newsItems.filter(n => n.isActive).length
  const activeEventsCount = events.filter(e => e.isActive).length
  const activeAwardsCount = awards.filter(a => a.isActive).length
  const activeTeachersCount = teachers.filter(t => t.isActive).length

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
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
        <aside className={`sidebar bg-white shadow-xl flex-col h-full fixed md:relative z-20 ${sidebarOpen ? 'flex' : 'hidden md:flex'}`}>
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
                    onClick={() => { setActiveSection(item.id); setSidebarOpen(false) }}
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
            <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#a73434] hover:bg-red-50 smooth-transition font-medium">
              <i className="fas fa-arrow-left w-5 text-center"></i>
              <span>Back to Site</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 smooth-transition font-medium">
              <i className="fas fa-sign-out-alt w-5 text-center"></i>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 h-full overflow-y-auto w-full relative">
          <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <Image src="/images/images-removebg-preview.png" alt="Logo" width={32} height={32} />
              <span className="font-bold text-gray-800">Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </header>

          <div className="p-6 lg:p-10 max-w-6xl mx-auto pb-20">
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
                        <p className="text-sm text-gray-500 mb-1">Active Events</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeEventsCount}</h3>
                      </div>
                      <div className="bg-red-100 p-2 rounded-lg text-[#a73434]"><i className="fas fa-calendar-alt"></i></div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Active News</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeNewsCount}</h3>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg text-green-600"><i className="fas fa-newspaper"></i></div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Awards</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeAwardsCount}</h3>
                      </div>
                      <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><i className="fas fa-trophy"></i></div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Teachers</p>
                        <h3 className="text-3xl font-bold text-gray-800">{activeTeachersCount}</h3>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><i className="fas fa-chalkboard-teacher"></i></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setActiveSection('events')} className="p-4 rounded-lg bg-[#a73434]/10 border border-[#a73434]/20 flex flex-col items-center justify-center gap-2 hover:bg-[#a73434]/20 smooth-transition group">
                        <i className="fas fa-calendar-plus text-2xl text-[#a73434] group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Add Event</span>
                      </button>
                      <button onClick={() => setActiveSection('teachers')} className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 smooth-transition group">
                        <i className="fas fa-user-plus text-2xl text-blue-500 group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Add Teacher</span>
                      </button>
                      <button onClick={() => setActiveSection('awards')} className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 flex flex-col items-center justify-center gap-2 hover:bg-yellow-100 smooth-transition group">
                        <i className="fas fa-trophy text-2xl text-yellow-500 group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Add Award</span>
                      </button>
                      <button onClick={() => setActiveSection('gallery')} className="p-4 rounded-lg bg-purple-50 border border-purple-100 flex flex-col items-center justify-center gap-2 hover:bg-purple-100 smooth-transition group">
                        <i className="fas fa-images text-2xl text-purple-500 group-hover:scale-110 smooth-transition"></i>
                        <span className="text-sm font-medium text-gray-700">Upload Photos</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Gallery ({gallery.length} images)</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {gallery.slice(0, 8).map((item) => (
                        <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    {gallery.length > 8 && (
                      <button onClick={() => setActiveSection('gallery')} className="text-[#a73434] text-sm mt-3 hover:underline">
                        View all {gallery.length} images →
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'events' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">{editingEvent ? 'Edit Event' : 'Create Event'}</h3>
                  <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input type="date" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input type="time" value={eventForm.event_time} onChange={(e) => setEventForm({ ...eventForm, event_time: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      {imagePreview && (
                        <div className="relative inline-block mb-2">
                          <img src={imagePreview} alt="Preview" className="h-24 w-auto rounded-lg object-cover border" />
                          <button type="button" onClick={() => { setImagePreview(null); setEventForm({ ...eventForm, image_url: '' }) }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"><i className="fas fa-times text-xs"></i></button>
                        </div>
                      )}
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
                        <i className="fas fa-cloud-upload-alt"></i>
                        {imageUploading ? 'Uploading...' : 'Upload'}
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} className="hidden" />
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={3} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none"></textarea>
                    </div>
                    <div className="flex gap-3 justify-end">
                      {editingEvent && <button type="button" onClick={resetEventForm} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>}
                      <button type="submit" className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c]">{editingEvent ? 'Update' : 'Create'}</button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Events</h3>
                  {eventsLoading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div></div>
                  ) : events.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No events yet</p>
                  ) : (
                    <div className="space-y-3">
                      {events.map((event) => (
                        <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#a73434]">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-800">{event.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${event.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{event.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                            <p className="text-sm text-gray-600">{new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleToggleEvent(event)} className={`p-2 rounded-lg ${event.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}><i className={`fas ${event.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                            <button onClick={() => handleEditEvent(event)} className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"><i className="fas fa-edit"></i></button>
                            <button onClick={() => handleDeleteEvent(event.id)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><i className="fas fa-trash"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSection === 'news' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage News Ticker</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Add Message</h3>
                  <form onSubmit={handleAddNews} className="flex gap-3">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Enter news message..." className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" />
                    <button type="submit" className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c] whitespace-nowrap"><i className="fas fa-plus mr-2"></i>Add</button>
                  </form>
                </div>

                {editingNews && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-[#a73434]">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Edit Message</h3>
                    <form onSubmit={handleUpdateNews} className="space-y-4">
                      <input type="text" value={editingNews.message} onChange={(e) => setEditingNews({ ...editingNews, message: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" />
                      <div className="flex gap-3 justify-end">
                        <button type="button" onClick={() => setEditingNews(null)} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c]">Save</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Messages</h3>
                  {newsLoading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div></div>
                  ) : newsItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No news yet</p>
                  ) : (
                    <div className="space-y-3">
                      {newsItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800">{item.message}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleToggleNews(item)} className={`p-2 rounded-lg ${item.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}><i className={`fas ${item.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                            <button onClick={() => setEditingNews(item)} className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"><i className="fas fa-edit"></i></button>
                            <button onClick={() => handleDeleteNews(item.id)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><i className="fas fa-trash"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSection === 'awards' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Awards & Achievements</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">{editingAward ? 'Edit Award' : 'Add Award'}</h3>
                  <form onSubmit={editingAward ? handleUpdateAward : handleAddAward} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input type="text" value={awardForm.title} onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select value={awardForm.category} onChange={(e) => setAwardForm({ ...awardForm, category: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required>
                          <option value="">Select category</option>
                          <option value="academics">Academics</option>
                          <option value="sports">Sports</option>
                          <option value="arts">Arts</option>
                          <option value="awards">Awards</option>
                          <option value="events">Events</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" value={awardForm.award_date} onChange={(e) => setAwardForm({ ...awardForm, award_date: e.target.value })} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        {awardImagePreview && (
                          <div className="relative inline-block mb-2">
                            <img src={awardImagePreview} alt="Preview" className="h-16 w-auto rounded-lg object-cover border" />
                            <button type="button" onClick={() => { setAwardImagePreview(null); setAwardForm({ ...awardForm, image_url: '' }) }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"><i className="fas fa-times text-xs"></i></button>
                          </div>
                        )}
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm">
                          <i className="fas fa-cloud-upload-alt"></i>
                          {awardImageUploading ? 'Uploading...' : 'Upload'}
                          <input ref={awardFileInputRef} type="file" accept="image/*" onChange={handleAwardImageUpload} disabled={awardImageUploading} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea value={awardForm.description} onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })} rows={2} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none"></textarea>
                    </div>
                    <div className="flex gap-3 justify-end">
                      {editingAward && <button type="button" onClick={resetAwardForm} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>}
                      <button type="submit" className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c]">{editingAward ? 'Update' : 'Add Award'}</button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Awards ({awards.length})</h3>
                  {awardsLoading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div></div>
                  ) : awards.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No awards yet</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {awards.map((award) => (
                        <div key={award.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          {award.imageUrl && <img src={award.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg" />}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-800 truncate">{award.title}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${award.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{award.isActive ? 'Active' : 'Hidden'}</span>
                            </div>
                            <p className="text-xs text-[#a73434] capitalize">{award.category}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleToggleAward(award)} className={`p-1.5 rounded ${award.isActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}><i className={`fas ${award.isActive ? 'fa-eye' : 'fa-eye-slash'} text-sm`}></i></button>
                            <button onClick={() => handleEditAward(award)} className="p-1.5 rounded text-blue-600 hover:bg-blue-100"><i className="fas fa-edit text-sm"></i></button>
                            <button onClick={() => handleDeleteAward(award.id)} className="p-1.5 rounded text-red-600 hover:bg-red-100"><i className="fas fa-trash text-sm"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSection === 'teachers' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Teachers</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h3>
                  <form onSubmit={editingTeacher ? handleUpdateTeacher : handleAddTeacher} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input type="text" value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} placeholder="e.g., Mr. Johnson" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role/Subject *</label>
                        <input type="text" value={teacherForm.role} onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })} placeholder="e.g., Mathematics Teacher" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                        <div className="flex items-center gap-3">
                          {teacherImagePreview && (
                            <div className="relative">
                              <img src={teacherImagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border" />
                              <button type="button" onClick={() => { setTeacherImagePreview(null); setTeacherForm({ ...teacherForm, image_url: '' }) }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600"><i className="fas fa-times text-[10px]"></i></button>
                            </div>
                          )}
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm">
                            <i className="fas fa-camera"></i>
                            {teacherImageUploading ? 'Uploading...' : 'Upload Photo'}
                            <input ref={teacherFileInputRef} type="file" accept="image/*" onChange={handleTeacherImageUpload} disabled={teacherImageUploading} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      {editingTeacher && <button type="button" onClick={resetTeacherForm} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>}
                      <button type="submit" className="bg-[#a73434] text-white px-6 py-2 rounded-lg hover:bg-[#8f2c2c]">{editingTeacher ? 'Update' : 'Add Teacher'}</button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Teachers ({teachers.length})</h3>
                  {teachersLoading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div></div>
                  ) : teachers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No teachers yet. Add your first teacher above.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {teachers.map((teacher) => (
                        <div key={teacher.id} className={`relative p-4 bg-gray-50 rounded-xl text-center ${!teacher.isActive ? 'opacity-60' : ''}`}>
                          <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                            {teacher.imageUrl ? (
                              <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400"><i className="fas fa-user text-3xl"></i></div>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-800">{teacher.name}</h4>
                          <p className="text-sm text-[#a73434]">{teacher.role}</p>
                          <div className="flex justify-center gap-1 mt-3">
                            <button onClick={() => handleToggleTeacher(teacher)} className={`p-1.5 rounded ${teacher.isActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}><i className={`fas ${teacher.isActive ? 'fa-eye' : 'fa-eye-slash'} text-sm`}></i></button>
                            <button onClick={() => handleEditTeacher(teacher)} className="p-1.5 rounded text-blue-600 hover:bg-blue-100"><i className="fas fa-edit text-sm"></i></button>
                            <button onClick={() => handleDeleteTeacher(teacher.id)} className="p-1.5 rounded text-red-600 hover:bg-red-100"><i className="fas fa-trash text-sm"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeSection === 'gallery' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Gallery</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Upload Images</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 mb-4">Drag and drop images here, or click to select</p>
                    <label className="cursor-pointer bg-[#a73434] hover:bg-[#8f2c2c] text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                      <i className="fas fa-plus"></i>
                      {galleryUploading ? 'Uploading...' : 'Select Images'}
                      <input ref={galleryFileInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={galleryUploading} className="hidden" />
                    </label>
                    <p className="text-xs text-gray-500 mt-3">Supports: JPEG, PNG, WebP, GIF (Max 5MB each)</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">All Images ({gallery.length})</h3>
                  {galleryLoading ? (
                    <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div></div>
                  ) : gallery.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No images yet. Upload your first images above.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {gallery.map((item) => (
                        <div key={item.id} className={`relative group aspect-square rounded-xl overflow-hidden ${!item.isActive ? 'opacity-50' : ''}`}>
                          <img src={item.imageUrl} alt={item.title || ''} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => handleToggleGallery(item)} className={`p-2 rounded-lg ${item.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`}><i className={`fas ${item.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                            <button onClick={() => handleDeleteGallery(item.id)} className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"><i className="fas fa-trash"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
