import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all') === 'true'

  let query = supabase
    .from('teachers')
    .select('*')
    .order('created_at', { ascending: false })

  if (!all) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const formatted = data.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    imageUrl: item.image_url,
    isActive: item.is_active,
    createdAt: item.created_at,
  }))

  return NextResponse.json(formatted)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, role, image_url } = body

  if (!name || !role) {
    return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('teachers')
    .insert({
      name,
      role,
      image_url: image_url || null,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }

  if (updates.name !== undefined) updateData.name = updates.name
  if (updates.role !== undefined) updateData.role = updates.role
  if (updates.image_url !== undefined) updateData.image_url = updates.image_url
  if (updates.is_active !== undefined) updateData.is_active = updates.is_active

  const { data, error } = await supabaseAdmin
    .from('teachers')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('teachers')
    .delete()
    .eq('id', parseInt(id))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
