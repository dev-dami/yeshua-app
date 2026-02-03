import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    let query = supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false })

    if (!all) {
      query = query.eq('is_active', true).limit(3)
    }

    const { data, error } = await query

    if (error) throw error
    
    const formattedData = data.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      eventDate: event.event_date,
      eventTime: event.event_time,
      location: event.location,
      imageUrl: event.image_url,
      isActive: event.is_active,
      createdAt: event.created_at,
    }))
    
    return NextResponse.json(formattedData)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, event_date, event_time, location, image_url, is_active = true } = body

    if (!title || !event_date) {
      return NextResponse.json({ error: 'Title and event date are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('events')
      .insert([{ 
        title, 
        description, 
        event_date, 
        event_time, 
        location, 
        image_url, 
        is_active 
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, event_date, event_time, location, image_url, is_active } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (event_date !== undefined) updateData.event_date = event_date
    if (event_time !== undefined) updateData.event_time = event_time
    if (location !== undefined) updateData.location = location
    if (image_url !== undefined) updateData.image_url = image_url
    if (is_active !== undefined) updateData.is_active = is_active

    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
