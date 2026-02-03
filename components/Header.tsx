'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/home', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/home#admissions', label: 'Admissions', id: 'admissions' },
    { href: '/gallery', label: 'Gallery', id: 'gallery' },
    { href: '/home#events', label: 'Events', id: 'events' },
    { href: '/home#contact', label: 'Contact', id: 'contact' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/home" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/images/images-removebg-preview.png"
                width={55}
                height={55}
                alt="Yeshua High Logo"
                className="transition-transform duration-300 group-hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#a73434] p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`nav-link px-4 py-6 rounded-lg ${currentPage === link.id ? 'active bg-red-50' : 'hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.edalafsms4.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-primary text-sm"
            >
              <i className="fas fa-graduation-cap mr-2"></i>
              School Portal
            </a>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 border-t border-gray-100 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === link.id
                  ? 'bg-red-50 text-red-600 font-semibold border-l-4 border-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#a73434]'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.edalafsms4.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 mt-4 btn-primary text-center"
            >
              <i className="fas fa-graduation-cap mr-2"></i>
              School Portal
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
