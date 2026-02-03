import { NextResponse } from 'next/server'
import { getActiveNewsTickerItems } from '@/lib/db/queries'

export async function GET() {
  try {
    const items = await getActiveNewsTickerItems()
    return NextResponse.json(items)
  } catch {
    return NextResponse.json([
      { id: 1, message: 'Welcome to Yeshua High School' },
      { id: 2, message: 'Registration for new students ongoing' },
    ])
  }
}
