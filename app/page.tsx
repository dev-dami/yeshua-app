'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PreloaderPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [tip, setTip] = useState('')

  const tips = [
    'Did you know? Regular study breaks improve retention.',
    'Tip: Organize your notes by color for better recall.',
    'Fun fact: The world\'s oldest school is over 1,400 years old!',
    'Reminder: Drink water to stay focused during study sessions.',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowContent(true), 500)
          return 100
        }
        return next
      })
    }, 300)

    const tipTimeout = setTimeout(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)])
      setShowTip(true)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(tipTimeout)
    }
  }, [])

  if (showContent) {
    return (
      <div className="bg-red-50 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <Image
            src="/images/images-removebg-preview.png"
            width={70}
            height={70}
            alt="Yeshua High Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            Welcome to Yeshua High School
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            We are one of the leading Christian co-educational secondary schools in Nigeria,
            <br />
            focused on making education fun and practical for our students.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <i className="fas fa-graduation-cap text-blue-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
              <p className="text-gray-600">
                Our curriculum is designed to challenge and inspire students to reach their full
                potential.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <i className="fas fa-futbol text-green-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Sports & Arts</h3>
              <p className="text-gray-600">
                We nurture talents beyond academics with state-of-the-art facilities for sports and
                arts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <i className="fas fa-users text-yellow-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Join our vibrant community of learners, educators, and parents working together.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/home')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Explore Our School <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-red-50 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full h-full fixed top-0 left-0 bg-white z-50 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-school text-red-500 text-4xl"></i>
            </div>
          </div>

          <div
            className="absolute top-8 left-8 w-12 h-16 bg-red-400 rounded-sm shadow-lg book-animation"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="absolute top-12 left-20 w-12 h-16 bg-yellow-400 rounded-sm shadow-lg book-animation"
            style={{ animationDelay: '0.4s' }}
          ></div>
          <div
            className="absolute top-16 left-32 w-12 h-16 bg-green-400 rounded-sm shadow-lg book-animation"
            style={{ animationDelay: '0.6s' }}
          ></div>

          <div className="absolute bottom-12 right-12 pencil-animation">
            <div className="w-16 h-3 bg-yellow-500 rounded-full relative">
              <div className="absolute -right-1 top-0 w-2 h-3 bg-gray-700"></div>
              <div className="absolute -right-3 top-1 w-1 h-1 bg-pink-500 rotate-45"></div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 fade-in">
          Welcome to <span className="text-red-600">Yeshua High School</span>
        </h1>
        <p className="text-gray-600 mb-6 fade-in" style={{ animationDelay: '0.3s' }}>
          Loading school resources...
        </p>

        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-red-600 progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex space-x-2">
          <div
            className="w-3 h-3 rounded-full bg-red-400 animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-red-500 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-red-600 animate-bounce"
            style={{ animationDelay: '0.3s' }}
          ></div>
        </div>

        {showTip && (
          <p className="text-sm text-gray-500 italic mt-4 fade-in" style={{ animationDelay: '0.5s' }}>
            {tip}
          </p>
        )}
      </div>
    </div>
  )
}
