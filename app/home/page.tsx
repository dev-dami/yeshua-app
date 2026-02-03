'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsTicker from '@/components/NewsTicker'

interface EventType {
  id: number
  title: string
  description: string | null
  eventDate: string
  eventTime: string | null
  imageUrl: string | null
}

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

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [events, setEvents] = useState<EventType[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentGrade: '',
    message: '',
  })

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setEventsLoading(false))
  }, [])

  useEffect(() => {
    if (shouldLoadVideo) return
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoadVideo) return

    video.load()
    video.play().catch(() => {
      // Autoplay blocked, user interaction required
    })
  }, [shouldLoadVideo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your interest! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', studentGrade: '', message: '' })
  }

  return (
    <div className="font-sans antialiased">
      <NewsTicker />
      <Header currentPage="home" />

      <section id="home" ref={heroRef} className="relative flex items-center h-[180vh] w-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={shouldLoadVideo ? 'auto' : 'none'}
          poster="/images/43.jpeg"
          className="absolute inset-0 w-full h-full object-cover object-top"
        >
          {shouldLoadVideo ? <source src="/videos/cultural.mp4" type="video/mp4" /> : null}
        </video>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 fade-in-up">
              <i className="fas fa-cross mr-2"></i>
              Christ-Centered Education Since 2005
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 fade-in-up delay-100 leading-tight">
              Jesus Our <span className="gradient-text drop-shadow-lg">Perfect</span> Example
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto fade-in-up delay-200 leading-relaxed">
              We are one of the leading Christian co-educational secondary schools in Nigeria,
              focused on making education fun and practical for our students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-up delay-300">
              <a href="#admissions" className="btn-accent inline-flex items-center justify-center">
                <i className="fas fa-paper-plane mr-2"></i>
                Apply Now
              </a>
              <button className="btn-secondary inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-[#a73434]">
                <i className="fas fa-play-circle mr-2"></i>
                Take a Virtual Tour
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-white/70 hover:text-white transition-colors">
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat-card">
              <div className="w-14 h-14 bg-[#a73434]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-[#a73434] text-2xl"></i>
              </div>
              <div className="stat-number">100%</div>
              <div className="text-gray-600 font-medium mt-2">Graduation Rate</div>
            </div>
            <div className="stat-card">
              <div className="w-14 h-14 bg-[#a73434]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-[#a73434] text-2xl"></i>
              </div>
              <div className="stat-number">20:1</div>
              <div className="text-gray-600 font-medium mt-2">Student-Teacher Ratio</div>
            </div>
            <div className="stat-card">
              <div className="w-14 h-14 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-trophy text-[#dc2626] text-2xl"></i>
              </div>
              <div className="stat-number">10+</div>
              <div className="text-gray-600 font-medium mt-2">Competitions Won</div>
            </div>
            <div className="stat-card">
              <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-futbol text-green-600 text-2xl"></i>
              </div>
              <div className="stat-number">10+</div>
              <div className="text-gray-600 font-medium mt-2">Extracurricular Clubs</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="gradient-text">Yeshua High School</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <Image
                src="/images/32.jpeg"
                alt="Students in classroom"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To help our students discover and fulfill God&apos;s purpose for their lives through
                discipline, blended learning and entrepreneurship in partnership with one.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <i className="fas fa-check-circle text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Experienced Department</h4>
                    <p className="text-gray-600 text-sm">
                      85% of our teachers hold advanced degrees in their fields
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <i className="fas fa-check-circle text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">State-of-the-Art Facilities</h4>
                    <p className="text-gray-600 text-sm">
                      Modern classrooms, science labs, and athletic complexes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <i className="fas fa-check-circle text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">College Prep Focus</h4>
                    <p className="text-gray-600 text-sm">
                      90% of graduates attend Higher Institution with ease
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium smooth-transition"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Outstanding Results</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden smooth-transition card-hover max-w-md">
              <Image
                src="/images/Result.webp"
                alt="Outstanding Results"
                width={400}
                height={300}
                className="w-full h-70 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 text-center">
                  Outstanding Result for 2025
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Programs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="gradient-text">Academic Programs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We offer a comprehensive curriculum designed to challenge and inspire students at every
              grade level.
            </p>
            <div className="section-underline mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced overflow-hidden group">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/47.jpeg"
                  alt="Elementary students"
                  width={400}
                  height={200}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-white/90 text-[#a73434] px-3 py-1 rounded-full text-sm font-semibold">
                  Grades K-5
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white p-3 rounded-xl mr-4 shadow-lg">
                    <i className="fas fa-child text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Elementary School</h3>
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Our elementary program emphasizes foundational skills in literacy, numeracy, and
                  social development with hands-on learning experiences.
                </p>
                <button className="text-[#a73434] hover:text-[#dc2626] font-semibold text-sm flex items-center group/btn">
                  Explore Program
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover/btn:translate-x-1"></i>
                </button>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/32.jpeg"
                  alt="Middle school students"
                  width={400}
                  height={200}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-white/90 text-[#a73434] px-3 py-1 rounded-full text-sm font-semibold">
                  Grades 6-9
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-xl mr-4 shadow-lg">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Middle School</h3>
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Our middle school program encourages exploration across subjects while developing
                  critical thinking and independent learning skills.
                </p>
                <button className="text-[#a73434] hover:text-[#dc2626] font-semibold text-sm flex items-center group/btn">
                  Explore Program
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover/btn:translate-x-1"></i>
                </button>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/35.jpeg"
                  alt="High school students"
                  width={400}
                  height={200}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-white/90 text-[#a73434] px-3 py-1 rounded-full text-sm font-semibold">
                  Grades 10-12
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-3 rounded-xl mr-4 shadow-lg">
                    <i className="fas fa-user-graduate text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">High School</h3>
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Our rigorous high school curriculum offers Compulsory Subjects, STEM tracks, and
                  college counseling to prepare students for success.
                </p>
                <button className="text-[#a73434] hover:text-[#dc2626] font-semibold text-sm flex items-center group/btn">
                  Explore Program
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover/btn:translate-x-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="admissions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#dc2626]/10 rounded-full text-[#dc2626] text-sm font-semibold mb-4">
              Join Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="gradient-text">Admissions</span> Process
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mb-12">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h3>
              <p className="text-gray-600 mb-6">
                We&apos;re delighted you&apos;re considering Yeshua High School for your child&apos;s
                education. Our admission process is designed to get to know your family and ensure our
                school is the right match for your student&apos;s academic and personal goals.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-yellow-400 text-xl"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> Applications for the 2025-2026 school year are now
                      being accepted. Limited spaces available in select grade levels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
                    <h4 className="font-semibold text-gray-800">Key Dates</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Resumption Date: Sep 15, 2025</li>
                    <li>Applications Due: Dec 1, 2025</li>
                    <li>Decision Notification: Feb 15, 2025</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="fa fa-calendar mr-2"></i>
                    <h4 className="font-semibold text-gray-800">Events</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Valedictory service: Sep 17, 2025</li>
                    <li>PTA Meeting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Request More Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="student-grade"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Student Grade Level*
                    </label>
                    <select
                      id="student-grade"
                      value={formData.studentGrade}
                      onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select grade level</option>
                      <option value="Pre-K">Pre-K</option>
                      <option value="K">Kindergarten</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          Year {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Questions or Comments
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium smooth-transition"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Apply?</h3>
            <button className="bg-red-600 hover:bg-red-800 text-white px-8 py-3 rounded-md font-medium smooth-transition mr-4">
              Start Application
            </button>
            <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-md font-medium smooth-transition">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

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

          {eventsLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">No upcoming events at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm smooth-transition card-hover">
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
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/calendar"
              className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-md font-medium smooth-transition inline-block"
            >
              View Calendar
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#a73434] via-[#8f2c2c] to-[#a73434] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#a73434] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What <span className="text-[#a73434]">Parents & Students</span> Say
            </h2>
            <div className="w-20 h-1 bg-[#a73434] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg smooth-transition transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/16.jpeg"
                  alt="Student"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Ikeola Ayomide</h4>
                  <p className="text-sm text-gray-600">Student in Year 12</p>
                </div>
              </div>
              <div className="text-gray-700 italic">
                &quot;Yeshua high school is an amazing Christian school with our 3 core values being
                Godliness, Academic excellence and Entrepreneurship... It has amazing staff and
                students and properly equipped.&quot;
              </div>
              <div className="flex mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg smooth-transition transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/15.jpeg"
                  alt="Student"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Student Name</h4>
                  <p className="text-sm text-gray-600">Student in Year 9</p>
                </div>
              </div>
              <div className="text-gray-700 italic">
                &quot;The AP program here is excellent. I&apos;ve taken 5 AP classes and the teachers
                have prepared me well for the exams and college.&quot;
              </div>
              <div className="flex mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg smooth-transition transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/17.jpeg"
                  alt="Parent"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Mrs. Parent</h4>
                  <p className="text-sm text-gray-600">Parent</p>
                </div>
              </div>
              <div className="text-gray-700 italic">
                &quot;We love the diverse community and focus on character development. Both my children
                are thriving academically and socially.&quot;
              </div>
              <div className="flex mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Our Moments
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              School <span className="gradient-text">Gallery</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['music 1', 'music 2', 'sport 1', 'music 3', '21', '23', '24', '25'].map((img) => (
              <div key={img} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={`/images/${img}.jpeg`}
                  alt="Gallery"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transform group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition">
                  <i className="fas fa-expand text-white text-2xl"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-md font-medium smooth-transition inline-block"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Contact <span className="gradient-text">Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We&apos;d love to hear from you! Reach out with any questions or to schedule a visit.
            </p>
            <div className="section-underline mt-6"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="academics">Academics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium smooth-transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <i className="fas fa-map-marker-alt text-red-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">
                        7/9 Jide Sekoni Street, Behind Addide,
                        <br />
                        Sabo-Ojodu, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <i className="fas fa-phone-alt text-red-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">
                        08133398748, 09054009743, 08023187306
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <i className="fas fa-envelope text-red-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">yeshuahighschool@yahoo.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <i className="fas fa-clock text-red-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Office Hours</h4>
                      <p className="text-gray-600">Monday-Friday: 6:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#a73434] to-[#8f2c2c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <i className="fas fa-envelope-open-text text-4xl text-[#a73434] mb-6"></i>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Stay Connected</h2>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter for school updates, event announcements, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a73434] text-gray-800 shadow-lg"
              />
              <button
                type="submit"
                className="bg-[#a73434] hover:bg-[#8f2c2c] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="h-96 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d763.6805022148512!2d3.3616443721460834!3d6.651790364046655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b938bad3bbe23%3A0x3d89f7433565f947!2sYeshua%20High%20School!5e0!3m2!1sen!2sng!4v1753119996685!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="School Location"
        ></iframe>
      </div>

      <Footer />
    </div>
  )
}
