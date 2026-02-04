import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all') === 'true'

  let query = supabase
    .from('awards')
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
    description: item.description,
    category: item.category,
    imageUrl: item.image_url,
    awardDate: item.award_date,
    isActive: item.is_active,
    createdAt: item.created_at,
  }))

  return NextResponse.json(formatted)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, description, category, image_url, award_date } = body

  if (!title || !category) {
    return NextResponse.json({ error: 'Title and category are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('awards')
    .insert({
      title,
      description: description || null,
      category,
      image_url: image_url || null,
      award_date: award_date || null,
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

  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.image_url !== undefined) updateData.image_url = updates.image_url
  if (updates.award_date !== undefined) updateData.award_date = updates.award_date
  if (updates.is_active !== undefined) updateData.is_active = updates.is_active

  const { data, error } = await supabaseAdmin
    .from('awards')
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
    .from('awards')
    .delete()
    .eq('id', parseInt(id))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
