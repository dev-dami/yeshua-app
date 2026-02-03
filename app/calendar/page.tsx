'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const calendarDays = [
  { day: 26, prev: true }, { day: 27, prev: true }, { day: 28, prev: true },
  { day: 29, prev: true }, { day: 30, prev: true }, { day: 31, prev: true },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 },
  { day: 11, event: 'Orientation Day' },
  { day: 12, event: 'Orientation Day' },
  { day: 13 },
  { day: 14, event: 'Resumption Day (for borders)' },
  { day: 15, event: 'Resumption Day (for all students)' },
  { day: 16 },
  { day: 17, event: '20th Valedictory Service and 20th Anniversary' },
  { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 },
  { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 },
  { day: 30 }, { day: 31 },
]

const upcomingEvents = [
  { date: '12', month: 'Sept', title: 'Mid-Term Tests Begin', description: 'All students should prepare for the upcoming tests across all subjects.', time: 'All Day', color: 'blue' },
  { date: '20', month: 'Sept', title: "Parents' Day", description: "Meet with teachers to discuss your child's progress.", time: '9:00 AM - 2:00 PM', color: 'purple' },
]

export default function CalendarPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="font-sans antialiased">
      <nav className="bg-red-400 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/images/images-removebg-preview.png" width={50} height={50} alt="Logo" />
            <Link href="/home" className="text-xl font-bold">Yeshua High School</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/home" className="hover:text-red-200">Home</Link>
            <Link href="/about" className="hover:text-red-200">About</Link>
            <Link href="/home#programs" className="hover:text-red-200">Academics</Link>
            <Link href="/home#admissions" className="hover:text-red-200">Admissions</Link>
            <Link href="/home#contact" className="hover:text-red-200">Contact</Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-red-700 px-4 pb-4">
            <Link href="/home" className="block py-2 hover:text-red-200">Home</Link>
            <Link href="/about" className="block py-2 hover:text-red-200">About</Link>
            <Link href="/home#programs" className="block py-2 hover:text-red-200">Academics</Link>
            <Link href="/home#admissions" className="block py-2 hover:text-red-200">Admissions</Link>
            <Link href="/home#contact" className="block py-2 hover:text-red-200">Contact</Link>
          </div>
        )}
      </nav>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">School Calendar 2025-26</h2>

          <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-red-600 text-white p-4">
              <button className="p-2 rounded-full hover:bg-red-700">
                <i className="fas fa-chevron-left"></i>
              </button>
              <h3 className="text-xl font-bold">September 2025</h3>
              <button className="p-2 rounded-full hover:bg-red-700">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="grid grid-cols-7 bg-gray-100">
              {['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map((day) => (
                <div key={day} className="text-center py-2 font-medium">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 p-2 bg-white">
              {calendarDays.map((item, index) => (
                <div
                  key={index}
                  className={`h-24 p-1 border border-gray-100 ${item.prev ? 'text-gray-400' : ''}`}
                >
                  <div className="text-right">{item.day}</div>
                  {item.event && (
                    <div className="text-xs mt-1 overflow-y-auto max-h-16">
                      <div className="bg-blue-100 text-blue-800 rounded p-1 mb-1">{item.event}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className={`bg-${event.color}-100 text-${event.color}-800 w-16 h-16 rounded-lg flex flex-col items-center justify-center mr-4 shrink-0`}>
                    <div className="text-xl font-bold">{event.date}</div>
                    <div className="text-xs">{event.month}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p className="text-gray-600">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <i className="fas fa-clock mr-1"></i> {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Yeshua High School</h3>
              <p className="text-gray-400">7/9 Jide Sekoni Street, Behind Addide, Sabo-Ojodu, Lagos, Nigeria</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/home" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/home#programs" className="text-gray-400 hover:text-white">Academics</Link></li>
                <li><Link href="/home#admissions" className="text-gray-400 hover:text-white">Admissions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2 text-sm"></i> 08133398748, 09054009743
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-sm"></i> yeshuahighschool@yahoo.com
                </li>
                <li className="flex items-center">
                  <i className="fas fa-clock mr-2 text-sm"></i> Mon-Fri: 8AM - 5PM
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/16dQhJoUFD/" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter text-xl"></i></a>
                <a href="https://www.instagram.com/yeshuahigh" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube text-xl"></i></a>
              </div>
            </div>
          </div>
          <hr className="border-gray-700 my-8" />
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Yeshua High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
