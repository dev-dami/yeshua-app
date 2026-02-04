'use client'

import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const teachers = [
  { name: 'Mr. Thompson', role: 'Mathematics Department Head', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80' },
  { name: 'Ms. Rodriguez', role: 'English Literature', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80' },
  { name: 'Dr. Chen', role: 'Biology & Chemistry', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80' },
  { name: 'Mrs. Johnson', role: 'Physics', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80' },
  { name: 'Mr. Williams', role: 'Computer Science', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80' },
  { name: 'Mrs. Davis', role: 'History', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80' },
  { name: 'Mr. Brown', role: 'Geography', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80' },
  { name: 'Ms. Taylor', role: 'Arts & Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80' },
  { name: 'Mr. Anderson', role: 'Physical Education', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80' },
]

export default function TeachersPage() {
  return (
    <div className="font-sans antialiased">
      <Header currentPage="gallery" />

      <section
        className="relative py-32 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-chalkboard-teacher mr-2"></i>
            Our Faculty
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Meet Our Teachers</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Dedicated educators inspiring excellence every day.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Faculty
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Teacher <span className="gradient-text">Spotlight</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet some of our outstanding faculty members who are dedicated to nurturing young minds.
            </p>
            <div className="section-underline"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="card-enhanced overflow-hidden group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
                    <p className="text-[#a73434] font-medium bg-white/90 inline-block px-3 py-1 rounded-full text-sm">
                      {teacher.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#a73434] via-[#8f2c2c] to-[#a73434] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Are you a passionate educator looking to make a difference? 
            We&apos;re always looking for talented teachers to join our family.
          </p>
          <a
            href="mailto:yeshuahighschool@yahoo.com?subject=Teaching Position Inquiry"
            className="inline-flex items-center bg-white text-[#a73434] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all"
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
