'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="font-sans antialiased">
      <nav className="bg-red-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/home" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Yeshua High School</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/home" className="hover:text-red-200">Home</Link>
            <Link href="/about" className="font-semibold underline">About</Link>
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
            <Link href="/about" className="block py-2 font-semibold">About</Link>
            <Link href="/gallery" className="block py-2 hover:text-red-200">Gallery</Link>
            <Link href="/home#programs" className="block py-2 hover:text-red-200">Academics</Link>
            <Link href="/home#admissions" className="block py-2 hover:text-red-200">Admissions</Link>
            <Link href="/home#contact" className="block py-2 hover:text-red-200">Contact</Link>
          </div>
        )}
      </nav>

      <section
        className="text-white py-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/27.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">@ Yeshua High School</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Shaping minds, building character, and creating future leaders since 2005.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  Yeshua means Jesus. Yeshua High School started on 19th September 2005 but was actually
                  conceived in 2004 by reason of the prophecy God gave Pastor E.A.Adeboye that our destiny
                  was to be determined by what we did or did not do in the year 2004.
                </p>
                <p>
                  The school started with 2 students, namely <b>Olajugba Dolapo</b> and{' '}
                  <b>Ibazebo Jessica</b> in junior school 1. There were 8 teaching and 4 non-teaching staff.
                </p>
                <p>
                  The <b>VISION</b> of the school is to be the best comprehensive college internationally
                  and our <b>MISSION</b> is to help students discover God&apos;s purpose for their lives
                  and to fulfil it. In order to achieve this, students will be exposed to academic and
                  non-academic studies. They will also have theoretical and practical exposure to technical
                  studies of Woodwork, Hairdressing, Farming, Mechanical Engineering, Food Production,
                  Coding and Robotics, Crocheting and so on.
                </p>
                <p>
                  Students that take part in External Competitions including Inter-school Quiz, Debate,
                  Spelling Bee, Sports and so on. More exposure will be encouraged in order to assess them
                  in comparison with other students.
                </p>
                <p>
                  The school was temporarily situated at 55, Yakoyo Road, Ojodu and presently at 7/9 Jide
                  Sekoni Street, Behind Addide, Sabo-Ojodu, Lagos, Nigeria.
                </p>
                <p>
                  The Board was inaugurated on 20th August 2005 and has since met regularly. The Parent
                  Teacher Association had its inauguration on 11th April 2007.
                </p>
                <p>
                  The Executive Director of the school, who also doubled as the principal, is{' '}
                  <b>Mrs Simisola Olufunke Adigun</b> who is a 1980 B.A.(Ed) graduate of the University of
                  Ife, now Obafemi Awolowo University. She is a seasoned teacher.
                </p>
                <p className="font-bold">
                  Each Yeshua High School student is encouraged to make this declaration on a daily basis:
                </p>
                <ul className="font-bold list-none space-y-1">
                  <li>I AM UNIQUE</li>
                  <li>I AM SPECIAL TO GOD</li>
                  <li>GOD HAS A PURPOSE FOR MY LIFE</li>
                  <li>NOBODY CAN DO WHAT GOD WANTS ME TO DO</li>
                  <li>I WILL BE GREAT</li>
                  <li>I WILL DISCOVER AND FULFILL GOD&apos;S PURPOSE FOR MY LIFE</li>
                  <li>I WILL IMPACT THE WORLD</li>
                  <li>I WILL BE CELEBRATED. AMEN...</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/42.jpeg"
                  alt="Yeshua High School"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission, Vision & Values</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="mission-card bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-bullseye text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                To help our students discover and fulfill God&apos;s purpose for their lives.
              </p>
            </div>

            <div className="mission-card bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <i className="fas fa-bullseye text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To be an institution that will be rated amongst the best in Nigeria, Africa and the World
                at large in terms of Godliness, Academic Excellence and Entrepreneurship.
              </p>
            </div>

            <div className="value-card bg-gray-50 p-8 rounded-xl shadow-lg md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <i className="fas fa-heart text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Core Values</h3>
              </div>
              <ul className="text-gray-600 space-y-2 pl-4">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>Integrity in all endeavors
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>Respect for self and others
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>Commitment to excellence
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>Joy in learning and discovery
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>Responsibility to community
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Journey Through Time</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { year: '2005', text: 'Yeshua High School opens its doors with 2 students in JSS 1. The school is founded by Mrs Simisola Adigun, a visionary educator.' },
                { year: '2010', text: 'The school expands to include middle school grades, responding to community demand for continued quality education.' },
                { year: '2015', text: 'High school division is added, completing the K-12 program. Our first senior class graduates in 2005.' },
                { year: '2020', text: 'State-of-the-art science and technology center opens, featuring labs, makerspaces, and innovation studios.' },
                { year: '2025', text: 'Yeshua High School is recognized as a National Red Ribbon School for academic excellence.' },
              ].map((item) => (
                <div key={item.year} className="timeline-item">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold text-red-600 mb-2">{item.year}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Leadership</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                alt="Pastor Tunji Adigun"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Pastor Tunji Adigun</h3>
                <p className="text-red-600 mb-3">Chairman</p>
                <p className="text-gray-600">
                  With 22 years of educational leadership experience, Pastor Adigun leads our school with
                  passion and vision.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80"
                alt="Mrs Simisola Adigun"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Mrs Simisola Adigun</h3>
                <p className="text-red-600 mb-3">Executive Director</p>
                <p className="text-gray-600">
                  With 22 years of educational leadership experience, Mrs Adigun leads our school with
                  passion and vision.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/Director Picture.webp"
                alt="Pastor Timilehin Adigun"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Pastor Timilehin Adigun</h3>
                <p className="text-red-600 mb-3">Director</p>
                <p className="text-gray-600">
                  An expert in curriculum development, Pastor Timilehin ensures our academic programs
                  remain rigorous and relevant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">By The Numbers</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-red-700 p-6 rounded-lg">
              <div className="text-4xl font-bold mb-2">450</div>
              <div className="text-lg">Active Students</div>
            </div>
            <div className="bg-red-700 p-6 rounded-lg">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg">College Acceptance Rate</div>
            </div>
            <div className="bg-red-700 p-6 rounded-lg">
              <div className="text-4xl font-bold mb-2">150</div>
              <div className="text-lg">Teaching/Non-Teaching Staff</div>
            </div>
            <div className="bg-red-700 p-6 rounded-lg">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-lg">External Examination Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how Yeshua High School can help your child unlock their potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/home#contact"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
            >
              Schedule a Tour <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            <Link
              href="/home#admissions"
              className="bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-6 rounded-lg border border-red-600 transition duration-300 shadow-lg"
            >
              Apply Now <i className="fas fa-file-alt ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Yeshua High School</h3>
              <p className="text-gray-400">
                7/9 Jide Sekoni Street, Behind Addide,
                <br />
                Sabo-Ojodu, Lagos, Nigeria.
              </p>
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
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://www.instagram.com/yeshuahigh" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
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
