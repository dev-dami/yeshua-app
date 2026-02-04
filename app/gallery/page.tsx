"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryImage {
  id: number;
  title: string | null;
  imageUrl: string;
  category: string | null;
  isActive: boolean;
}

const categories = [
  { id: "all", label: "All Photos" },
  { id: "events", label: "Events" },
  { id: "campus", label: "Campus Life" },
  { id: "sports", label: "Sports" },
];

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div className="font-sans antialiased">
      <Header currentPage="gallery" />

      <section
        className="relative py-28 md:py-36 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(/images/music 1.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-black text-sm font-medium mb-8">
            <i className="fas fa-images mr-2"></i>
            Photo Gallery
          </span>
          <p className="text-lg sm:text-xl md:text-2xl max-w-xl mx-auto text-gray-500 leading-relaxed">
            Capturing memorable moments and celebrating our vibrant school
            community.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Browse Photos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="gradient-text">Moments</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-4">
              Browse through our collection of memorable school moments
            </p>
            <div className="section-underline"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#a73434] text-white shadow-lg shadow-[#a73434]/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              <i className="fas fa-images text-6xl text-gray-300 mb-6 block"></i>
              <p className="text-gray-500 text-xl font-medium">
                No photos available yet.
              </p>
              <p className="text-gray-400 text-base mt-2">
                Check back soon for updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setLightboxImage(img.imageUrl)}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a73434] focus:ring-offset-2 aspect-square shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || "Gallery image"}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <i className="fas fa-search-plus text-white text-2xl"></i>
                      </div>
                    </div>
                    {img.title && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-base font-semibold truncate">
                          {img.title}
                        </p>
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
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#a73434]/10 rounded-full text-[#a73434] text-sm font-semibold mb-4">
              Highlights
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured <span className="gradient-text">Collections</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
              Explore curated collections showcasing the best moments from our
              school community
            </p>
            <div className="section-underline"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/music 1.jpeg"
                  alt="Cultural Events"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Cultural Events
                  </h3>
                  <p className="text-white/90 text-base">
                    Celebrating our diverse heritage
                  </p>
                </div>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/sport 1.jpeg"
                  alt="Sports Activities"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Sports & Athletics
                  </h3>
                  <p className="text-white/90 text-base">
                    Champions in the making
                  </p>
                </div>
              </div>
            </div>

            <div className="card-enhanced overflow-hidden group md:col-span-2 lg:col-span-1">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/32.jpeg"
                  alt="Academic Excellence"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Academic Life
                  </h3>
                  <p className="text-white/90 text-base">
                    Learning and growing together
                  </p>
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
  );
}
