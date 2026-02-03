import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

export async function verifyPassword(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set')
    return false
  }
  return password === ADMIN_PASSWORD
}

export async function createToken(): Promise<string> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getTokenFromCookies()
  if (!token) return false
  return verifyToken(token)
}
