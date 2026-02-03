import Image from 'next/image'
import Link from 'next/link'

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
      <header className="bg-red-600 text-white shadow-lg py-6">
        <div className="container mx-auto px-4 text-center">
          <Link href="/home">
            <Image
              src="/images/images-removebg-preview.png"
              width={50}
              height={50}
              alt="Yeshua High Logo"
              className="mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-bold">
            <Link href="/home">Our Teachers</Link>
          </h1>
        </div>
      </header>

      <section
        className="text-white py-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Teachers</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Dedicated educators inspiring excellence every day.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teacher Spotlight</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet some of our outstanding faculty members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{teacher.name}</h3>
                    <p className="text-blue-300">{teacher.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Yeshua High School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
