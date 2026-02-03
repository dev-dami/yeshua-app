'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const galleryItems = [
  { image: '44.jpeg', title: 'Award Ceremony 2023', subtitle: 'Outstanding Achievement in Science', category: 'awards', date: 'May 15, 2023', description: 'Sarah Johnson receives the prestigious Bright Minds Science Award for her groundbreaking research.' },
  { image: 'sport 1.jpeg', title: 'State Champions', subtitle: 'Our basketball team wins state finals', category: 'sports', date: 'March 22, 2023', description: 'The Panthers bring home the state championship trophy after an incredible season.' },
  { image: '45.jpeg', title: 'Spring Art Show', subtitle: 'Student creativity on display', category: 'arts', date: 'April 5, 2023', description: 'Annual student art exhibition showcasing impressive works from our talented young artists.' },
  { image: '46.jpeg', title: 'Science Fair Winners', subtitle: 'Innovative student projects', category: 'academics', date: 'February 18, 2023', description: 'Students display their scientific research at our annual science fair competition.' },
  { image: 'music 1.jpeg', title: 'Winter Musical', subtitle: 'Students perform "The Sound of Music"', category: 'events', date: 'December 10, 2022', description: 'Our talented performers bring the classic musical to life in this spectacular production.' },
  { image: '47.jpeg', title: 'Track & Field Day', subtitle: 'Annual athletic competition', category: 'sports', date: 'June 3, 2023', description: 'Students compete in various track and field events at our annual sports day celebration.' },
]

const featuredStudents = [
  { image: '6.jpeg', name: 'Student One', title: 'Valedictorian, Class of 2023', quote: "I'm grateful for the inspiring teachers who challenged me to reach my potential.", tags: ['Mathematics', 'Debate'] },
  { image: '7.jpeg', name: 'Student Two', title: 'Lead Researcher, Science Club', quote: "The school's advanced lab facilities allowed me to pursue my passion for biotechnology.", tags: ['Biology', 'Robotics'] },
  { image: '8.jpeg', name: 'Student Three', title: 'Artist of the Year, 2023', quote: 'The art department supported my creative journey and helped me develop my unique style.', tags: ['Fine Arts', 'Photography'] },
]

const filters = ['all', 'sports', 'arts', 'academics', 'events', 'awards']

export default function AwardsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      awards: 'text-red-600 bg-red-50',
      sports: 'text-green-600 bg-green-50',
      arts: 'text-purple-600 bg-purple-50',
      academics: 'text-blue-600 bg-blue-50',
      events: 'text-red-600 bg-red-50',
    }
    return colors[category] || 'text-gray-600 bg-gray-50'
  }

  return (
    <div className="bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/images/images-removebg-preview.png" width={50} height={50} alt="Logo" />
            <h1 className="text-2xl font-bold gradient-text">Yeshua High School</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/home" className="text-gray-700 hover:text-red-600 font-medium">Home</Link></li>
              <li><Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">About</Link></li>
              <li><Link href="/gallery" className="text-red-600 font-medium">Gallery</Link></li>
              <li><Link href="/home#events" className="text-gray-700 hover:text-red-600 font-medium">Events</Link></li>
              <li><Link href="/home#contact" className="text-gray-700 hover:text-red-600 font-medium">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="relative py-16 md:py-24 bg-gradient-to-r from-red-500 to-white text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-red-300">Awards</span> and Achievements
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Celebrating creativity, achievements, and memorable moments of our bright students.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-100 transition">
              View Events
            </button>
          </div>
        </div>
      </section>

      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex space-x-1 md:space-x-4 justify-center md:justify-start">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium capitalize ${
                  activeFilter === filter
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="gallery-item rounded-xl overflow-hidden bg-white shadow-md cursor-pointer"
            >
              <div className="relative overflow-hidden h-60">
                <Image
                  src={`/images/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.subtitle}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs px-2 py-1 rounded capitalize ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Featured Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center p-8 transform transition hover:-translate-y-2"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-100 mb-4 relative">
                  <Image
                    src={`/images/${student.image}`}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                <p className="text-red-600 mb-3">{student.title}</p>
                <p className="text-gray-600 mb-4">&quot;{student.quote}&quot;</p>
                <div className="flex justify-center space-x-2">
                  {student.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">Yeshua High School</h3>
              <p className="text-gray-400">
                Preparing students for success in college, career, and life through innovative education.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com/share/16dQhJoUFD/" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/yeshuahigh" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/home" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/home#programs" className="text-gray-400 hover:text-white">Academics</Link></li>
                <li><Link href="/home#admissions" className="text-gray-400 hover:text-white">Admissions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-red-400 mt-1 mr-3"></i>
                  7/9 Jide Sekoni Street, Behind Addide, Sabo-Ojodu, Lagos, Nigeria
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt text-red-400 mr-3"></i>
                  08133398748, 09054009743
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope text-red-400 mr-3"></i>
                  yeshuahighschool@yahoo.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-3">Subscribe to our newsletter for updates and announcements.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l focus:outline-none text-gray-900 w-full"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Yeshua High School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
