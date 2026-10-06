import { NextRequest, NextResponse } from 'next/server';
import { getTopicsBySubject, createTopic, updateTopic } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const topics = getTopicsBySubject(parseInt(subjectId));
    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject_id, title, description } = body;

    if (!subject_id || !title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subject ID and topic title are required' },
        { status: 400 }
      );
    }

    const id = createTopic(subject_id, title.trim(), description?.trim() || null);
    return NextResponse.json({ id, subject_id, title, description }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description } = body;

    if (!id || !title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic ID and title are required' },
        { status: 400 }
      );
    }

    const success = updateTopic(id, title.trim(), description?.trim() || null);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}
