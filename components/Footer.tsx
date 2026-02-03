import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/images-removebg-preview.png"
                width={50}
                height={50}
                alt="Yeshua High Logo"
              />
              <span className="text-xl font-bold">Yeshua High School</span>
            </div>
            <p className="text-gray-400">
              Yeshua High School is a Christian school that helps students discover and fulfill
              God&apos;s purpose for their lives.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/home" className="hover:text-white smooth-transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white smooth-transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/home#programs" className="hover:text-white smooth-transition">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/home#admissions" className="hover:text-white smooth-transition">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/home#events" className="hover:text-white smooth-transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/home#contact" className="hover:text-white smooth-transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/teachers" className="hover:text-white smooth-transition">
                  Teachers Gallery
                </Link>
              </li>
              <li>
                <Link href="/gallery/awards" className="hover:text-white smooth-transition">
                  Awards and Achievements
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-white smooth-transition">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white smooth-transition">
                  School Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white smooth-transition">
                  Employment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>
                  7/9 Jide Sekoni Street, Behind Addide,
                  <br />
                  Sabo-Ojodu, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>08133398748, 09054009743</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>yeshuahighschool@yahoo.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/16dQhJoUFD/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 smooth-transition"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 smooth-transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/yeshuahigh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 smooth-transition"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 smooth-transition"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Yeshua High School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
