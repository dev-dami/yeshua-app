'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface GalleryImage {
  id: number
  title: string | null
  imageUrl: string
  category: string | null
  isActive: boolean
}

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'events', label: 'Events' },
  { id: 'campus', label: 'Campus Life' },
  { id: 'sports', label: 'Sports' },
]

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data)
        } else {
          setImages([])
        }
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <div className="font-sans antialiased">
      <Header currentPage="gallery" />

      <section
        className="relative py-32 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/music 1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-images mr-2"></i>
            Photo Gallery
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">School Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Capturing memorable moments and celebrating our vibrant school community.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Browse Photos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="gradient-text">Moments</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#a73434] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-[#a73434] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No photos available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxImage(img.imageUrl)}
                  className="relative group overflow-hidden rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a73434] aspect-square"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'Gallery image'}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                        <i className="fas fa-search-plus text-white text-xl"></i>
                      </div>
                    </div>
                    {img.title && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-sm font-medium truncate">{img.title}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/gallery/awards"
              className="btn-primary inline-flex items-center"
            >
              <i className="fas fa-trophy mr-2"></i>
              View Awards & Achievements
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Highlights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="gradient-text">Collections</span>
            </h2>
            <div className="section-underline"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/music 1.jpeg"
                  alt="Cultural Events"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Cultural Events</h3>
                  <p className="text-white/80 text-sm">Celebrating our diverse heritage</p>
                </div>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/sport 1.jpeg"
                  alt="Sports Activities"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Sports & Athletics</h3>
                  <p className="text-white/80 text-sm">Champions in the making</p>
                </div>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/32.jpeg"
                  alt="Academic Excellence"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Academic Life</h3>
                  <p className="text-white/80 text-sm">Learning and growing together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <i className="fas fa-times text-3xl"></i>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <img
              src={lightboxImage}
              alt="Gallery image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
