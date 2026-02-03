'use client'

import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  message: string
}

export default function NewsTicker() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/news-ticker')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data)
        setLoading(false)
      })
      .catch(() => {
        setNewsItems([
          { id: 1, message: 'Welcome to Yeshua High School' },
          { id: 2, message: 'Registration for new students ongoing' },
        ])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-[#a73434] text-white py-2 ticker-wrap">
        <div className="ticker text-sm">
          <span className="font-bold mr-10">Latest News:</span>
          <span className="mr-10">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#a73434] text-white py-2 ticker-wrap">
      <div className="ticker text-sm">
        <span className="font-bold mr-10">Latest News:</span>
        {newsItems.map((item, index) => (
          <span key={item.id} className="mr-10">
            {item.message} {index < newsItems.length - 1 ? '|' : ''}
          </span>
        ))}
        <span>.......</span>
      </div>
    </div>
  )
}
