'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Section = 'dashboard' | 'calendar' | 'events' | 'highlights'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    setCurrentDate(new Date().toLocaleDateString('en-US', options))
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Action successfully saved! (Simulation)')
    ;(e.target as HTMLFormElement).reset()
  }

  const navItems = [
    { id: 'dashboard' as Section, label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'calendar' as Section, label: 'Calendar', icon: 'fa-calendar-alt' },
    { id: 'events' as Section, label: 'Events', icon: 'fa-bullhorn' },
    { id: 'highlights' as Section, label: 'Highlights & News', icon: 'fa-newspaper' },
  ]

  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex h-screen overflow-hidden">
        <aside
          className={`sidebar bg-white shadow-xl flex-col h-full fixed md:relative z-20 ${
            sidebarOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
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
                        ? 'active-nav-link'
                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 smooth-transition font-medium"
            >
              <i className="fas fa-sign-out-alt w-5 text-center"></i>
              <span>Log Out</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1 h-full overflow-y-auto w-full relative">
          <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <Image src="/images/images-removebg-preview.png" alt="Logo" width={32} height={32} />
              <span className="font-bold text-gray-800">Yeshua Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </header>

          <div className="p-6 lg:p-10 max-w-7xl mx-auto pb-20">
            {activeSection === 'dashboard' && (
              <section className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                  <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    <i className="far fa-clock mr-1"></i> {currentDate}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Students', value: '432', icon: 'fa-user-graduate', color: 'blue' },
                    { label: 'Total Teachers', value: '42', icon: 'fa-chalkboard-teacher', color: 'green' },
                    { label: 'Events This Month', value: '8', icon: 'fa-calendar-check', color: 'purple' },
                    { label: 'New Applications', value: '15', icon: 'fa-file-contract', color: 'red' },
                  ].map((stat) => (
                    <div key={stat.label} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-${stat.color}-500`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                          <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                        <div className={`bg-${stat.color}-100 p-2 rounded-lg text-${stat.color}-600`}>
                          <i className={`fas ${stat.icon}`}></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Recent Activities</h3>
                    <div className="space-y-4">
                      {[
                        { icon: 'fa-calendar-plus', color: 'blue', title: 'New Calendar Event Added', desc: '"Mid-term Break" added by Admin', time: '2 hours ago' },
                        { icon: 'fa-newspaper', color: 'green', title: 'News Highlight Updated', desc: 'Ticker updated with new resumption date', time: '5 hours ago' },
                        { icon: 'fa-user-plus', color: 'yellow', title: 'New Student Registration', desc: 'James Okonkwo applied for Year 10', time: '1 day ago' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`bg-${activity.color}-100 text-${activity.color}-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                            <i className={`fas ${activity.icon}`}></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.desc}</p>
                          </div>
                          <span className="text-xs text-gray-400 ml-auto">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Add to Calendar', icon: 'fa-calendar-plus', color: 'red', section: 'calendar' as Section },
                        { label: 'Create Event', icon: 'fa-bullhorn', color: 'blue', section: 'events' as Section },
                        { label: 'Update News', icon: 'fa-pen-fancy', color: 'green', section: 'highlights' as Section },
                        { label: 'View Students', icon: 'fa-users', color: 'purple', section: 'dashboard' as Section },
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={() => setActiveSection(action.section)}
                          className={`p-4 rounded-lg bg-${action.color}-50 border border-${action.color}-100 flex flex-col items-center justify-center gap-2 hover:bg-${action.color}-100 smooth-transition group`}
                        >
                          <i className={`fas ${action.icon} text-2xl text-${action.color}-500 group-hover:scale-110 smooth-transition`}></i>
                          <span className="text-sm font-medium text-gray-700">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'calendar' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage School Calendar</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                        <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
                          <option>Academic</option>
                          <option>Holiday</option>
                          <option>Sports</option>
                          <option>Exam</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" placeholder="e.g., Mid-Term Break" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                      <textarea rows={3} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 smooth-transition">
                        Add to Calendar
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
                  <h3 className="font-bold text-gray-800 mb-4">Upcoming Calendar Entries</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <div>
                        <span className="font-bold text-gray-800">Orientation Day</span>
                        <span className="text-sm text-gray-500 ml-2">- Sept 11, 2025</span>
                      </div>
                      <button className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                      <div>
                        <span className="font-bold text-gray-800">Resumption (All Students)</span>
                        <span className="text-sm text-gray-500 ml-2">- Sept 15, 2025</span>
                      </div>
                      <button className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'events' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Events</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input type="text" placeholder="e.g., Cultural Day" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                        <input type="date" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input type="text" placeholder="e.g., 10:00 AM - 3:00 PM" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer hover:bg-gray-50">
                          <i className="fas fa-cloud-upload-alt text-gray-400 mb-1"></i>
                          <span className="text-sm text-gray-500 block">Click to upload image</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea rows={4} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 smooth-transition">
                        Publish Event
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}

            {activeSection === 'highlights' && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights & News Ticker</h2>

                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Update News Ticker</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ticker Message</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., School will resume on the 15th of September"
                          className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 smooth-transition">
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-white p-3 rounded-lg overflow-hidden whitespace-nowrap">
                      <span className="text-sm text-gray-400 mr-2">Preview:</span>
                      <span className="italic">
                        School will resume on the 15th on September | Registration for New students ongoing
                        limited space available | ...
                      </span>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Add New Highlight / Blog Post</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                      <input type="text" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea rows={5} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 smooth-transition">
                        Post Highlight
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
