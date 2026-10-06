import { NextRequest, NextResponse } from 'next/server';
import { getAllSubjects, createSubject, updateSubject, getSubject } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If ID is provided, fetch single subject
    if (id) {
      const subject = getSubject(parseInt(id));
      if (!subject) {
        return NextResponse.json(
          { error: 'Subject not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(subject, { status: 200 });
    }

    // Otherwise, fetch all subjects
    const subjects = getAllSubjects();
    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subject name is required' },
        { status: 400 }
      );
    }

    const id = createSubject(name.trim(), description?.trim() || null, color?.trim() || null);
    return NextResponse.json({ id, name, description, color }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create subject' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, color } = body;

    if (!id || !name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subject ID and name are required' },
        { status: 400 }
      );
    }

    const success = updateSubject(id, name.trim(), description?.trim() || null, color?.trim() || null);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Subject not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update subject' },
      { status: 500 }
    );
  }
}
