import { NextResponse } from 'next/server'
import { verifyPassword, createToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const isValid = await verifyPassword(password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    const token = await createToken()
    
    const response = NextResponse.json({ success: true })
    
    const TWENTY_FOUR_HOURS = 60 * 60 * 24
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TWENTY_FOUR_HOURS,
      path: '/',
    })
    
    return response
  } catch {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
