import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const isValid = await verifyToken(token)
    
    if (!isValid) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  const protectedApiRoutes = ['/api/events', '/api/news-ticker', '/api/upload']
  const isProtectedApi = protectedApiRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedApi) {
    const method = request.method
    
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      const token = request.cookies.get('admin_token')?.value
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const isValid = await verifyToken(token)
      
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/events/:path*', '/api/news-ticker/:path*', '/api/upload/:path*'],
}
