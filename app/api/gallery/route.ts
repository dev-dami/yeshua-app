import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all') === 'true'

  let query = supabase
    .from('gallery')
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
    title: item.title,
    imageUrl: item.image_url,
    category: item.category,
    isActive: item.is_active,
    createdAt: item.created_at,
  }))

  return NextResponse.json(formatted)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, image_url, category } = body

  if (!image_url) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('gallery')
    .insert({
      title: title || null,
      image_url,
      category: category || null,
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

  const updateData: Record<string, unknown> = {}

  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.image_url !== undefined) updateData.image_url = updates.image_url
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.is_active !== undefined) updateData.is_active = updates.is_active

  const { data, error } = await supabaseAdmin
    .from('gallery')
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
    .from('gallery')
    .delete()
    .eq('id', parseInt(id))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
