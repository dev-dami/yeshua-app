import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="font-sans antialiased">
      <Header currentPage="about" />

      <section
        className="relative py-32 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/27.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-info-circle mr-2"></i>
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Yeshua High School</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Shaping minds, building character, and creating future leaders since 2005.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                The <span className="gradient-text">Journey</span> of Yeshua High
              </h2>
              <div className="section-underline mb-8" style={{ margin: 0 }}></div>
              
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>
                  Yeshua means Jesus. Yeshua High School started on 19th September 2005 but was actually
                  conceived in 2004 by reason of the prophecy God gave Pastor E.A.Adeboye that our destiny
                  was to be determined by what we did or did not do in the year 2004.
                </p>
                <p>
                  The school started with 2 students, namely <strong>Olajugba Dolapo</strong> and{' '}
                  <strong>Ibazebo Jessica</strong> in junior school 1. There were 8 teaching and 4 non-teaching staff.
                </p>
                <p>
                  The <strong>VISION</strong> of the school is to be the best comprehensive college internationally
                  and our <strong>MISSION</strong> is to help students discover God&apos;s purpose for their lives
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
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/42.jpeg"
                  alt="Yeshua High School"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              <div className="mt-8 bg-[#a73434]/5 border-l-4 border-[#a73434] p-6 rounded-r-lg">
                <h4 className="font-bold text-gray-800 mb-3">Student Commitment</h4>
                <ul className="text-gray-700 space-y-1 font-medium text-sm">
                  <li>I AM UNIQUE</li>
                  <li>I AM SPECIAL TO GOD</li>
                  <li>GOD HAS A PURPOSE FOR MY LIFE</li>
                  <li>NOBODY CAN DO WHAT GOD WANTS ME TO DO</li>
                  <li>I WILL BE GREAT</li>
                  <li>I WILL DISCOVER AND FULFILL GOD&apos;S PURPOSE FOR MY LIFE</li>
                  <li>I WILL IMPACT THE WORLD</li>
                  <li>I WILL BE CELEBRATED</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Mission, Vision & <span className="gradient-text">Values</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced p-8">
              <div className="w-14 h-14 bg-[#a73434]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-[#a73434] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To help our students discover and fulfill God&apos;s purpose for their lives through
                discipline, blended learning and entrepreneurship.
              </p>
            </div>

            <div className="card-enhanced p-8">
              <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-eye text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be an institution rated amongst the best in Nigeria, Africa and the World
                in terms of Godliness, Academic Excellence and Entrepreneurship.
              </p>
            </div>

            <div className="card-enhanced p-8 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-heart text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Core Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#a73434] mr-2"></i>Godliness
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#a73434] mr-2"></i>Academic Excellence
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#a73434] mr-2"></i>Life Accomplishments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Our History
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Journey Through <span className="gradient-text">Time</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { year: '2005', text: 'Yeshua High School opens its doors with 2 students in JSS 1. Founded by Mrs Simisola Adigun, a visionary educator.' },
                { year: '2007', text: 'The Parent Teacher Association had its inauguration on 11th April, strengthening school-family partnership.' },
                { year: '2010', text: 'The school expands its curriculum to include technical and vocational studies alongside academic programs.' },
                { year: '2020', text: 'Introduction of Coding and Robotics programs, embracing technology in education.' },
                { year: '2025', text: 'Celebrating 20 years of excellence with growing student population and continued success.' },
              ].map((item, index) => (
                <div key={item.year} className="timeline-item">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl smooth-transition">
                    <div className="flex items-center mb-3">
                      <span className="bg-[#a73434] text-white px-4 py-1 rounded-full text-sm font-bold mr-4">
                        {item.year}
                      </span>
                      <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="gradient-text">Leadership</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                  alt="Pastor Tunji Adigun"
                  width={400}
                  height={288}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Pastor Tunji Adigun</h3>
                <p className="text-[#a73434] font-medium mb-3">Chairman</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With over 20 years of educational leadership experience, Pastor Adigun leads our school with
                  passion and vision.
                </p>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80"
                  alt="Mrs Simisola Adigun"
                  width={400}
                  height={288}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Mrs Simisola Adigun</h3>
                <p className="text-[#a73434] font-medium mb-3">Executive Director</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A 1980 B.A.(Ed) graduate of Obafemi Awolowo University. A seasoned teacher and the founder
                  of Yeshua High School.
                </p>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/Director Picture.webp"
                  alt="Pastor Timilehin Adigun"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Pastor Timilehin Adigun</h3>
                <p className="text-[#a73434] font-medium mb-3">Director</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  An expert in curriculum development, Pastor Timilehin ensures our academic programs
                  remain rigorous and relevant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#a73434] via-[#8f2c2c] to-[#a73434] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">By The Numbers</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 smooth-transition">
              <div className="text-5xl font-bold mb-2">450+</div>
              <div className="text-white/80">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 smooth-transition">
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-white/80">College Acceptance Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 smooth-transition">
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-white/80">Total Staff</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 smooth-transition">
              <div className="text-5xl font-bold mb-2">90%</div>
              <div className="text-white/80">Exam Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how Yeshua High School can help your child unlock their potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/home#contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Schedule a Tour
            </Link>
            <Link
              href="/apply"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <i className="fas fa-file-alt mr-2"></i>
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
