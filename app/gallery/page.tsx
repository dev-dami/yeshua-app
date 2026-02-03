import Image from 'next/image'
import Link from 'next/link'

const galleryImages = Array.from({ length: 35 }, (_, i) => `${i + 1}.jpeg`)

export default function GalleryPage() {
  return (
    <div className="font-sans antialiased">
      <header className="bg-red-400 text-white shadow-lg py-6">
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
            <Link href="/home">Gallery Section</Link>
          </h1>
        </div>
      </header>

      <div id="gallery" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our School Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((img) => (
              <div key={img}>
                <Image
                  src={`/images/${img}`}
                  alt="Gallery image"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/gallery/awards"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors inline-block"
            >
              Award and Achievement <i className="fas fa-images ml-2"></i>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Yeshua High School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
