'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PreloaderPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/images/images-removebg-preview.png"
          width={80}
          height={80}
          alt="Yeshua High School"
          className="mx-auto mb-6"
        />
        <div className="w-8 h-8 border-2 border-[#a73434] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  )
}
