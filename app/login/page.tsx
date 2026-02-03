'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/home" className="inline-block">
            <Image
              src="/images/images-removebg-preview.png"
              alt="Yeshua High Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Admin Login</h1>
          <p className="text-gray-500 mt-2">Enter your password to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] focus:outline-none transition-all"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#a73434] text-white py-3 rounded-lg font-semibold hover:bg-[#8f2c2c] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/home"
            className="text-[#a73434] hover:text-[#8f2c2c] text-sm font-medium transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  )
}
