'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      awards: 'text-[#a73434] bg-[#a73434]/10',
      sports: 'text-green-600 bg-green-50',
      arts: 'text-purple-600 bg-purple-50',
      academics: 'text-blue-600 bg-blue-50',
      events: 'text-[#a73434] bg-[#a73434]/10',
    }
    return colors[category] || 'text-gray-600 bg-gray-50'
  }

  return (
    <div className="font-sans antialiased">
      <Header currentPage="gallery" />

      <section
        className="relative py-32 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/44.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-trophy mr-2"></i>
            Recognition
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Awards & Achievements</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
            Celebrating creativity, achievements, and memorable moments of our bright students.
          </p>
          <Link href="/calendar" className="inline-flex items-center bg-white text-[#a73434] hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all">
            <i className="fas fa-calendar-alt mr-2"></i>
            View Events
          </Link>
        </div>
      </section>

      <section className="py-6 bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-[#a73434] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="card-enhanced overflow-hidden group"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-200 text-sm">{item.subtitle}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#a73434]/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="gradient-text">Students</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-[#a73434]/20 mb-5 relative">
                  <Image
                    src={`/images/${student.image}`}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
                <p className="text-[#a73434] font-medium mb-4">{student.title}</p>
                <p className="text-gray-600 mb-5 italic">&quot;{student.quote}&quot;</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {student.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#a73434]/10 text-[#a73434] px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Explore More</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Discover more moments from our vibrant school community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="btn-primary inline-flex items-center justify-center"
            >
              <i className="fas fa-images mr-2"></i>
              View Full Gallery
            </Link>
            <Link
              href="/teachers"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <i className="fas fa-chalkboard-teacher mr-2"></i>
              Meet Our Teachers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
