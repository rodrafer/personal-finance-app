/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/models/User'

// Handle GET requests
export async function GET() {
  await connectToDatabase()
  const users = await User.find({})
  return NextResponse.json(users, { status: 200 })
}

// Handle POST requests
export async function POST(req: Request) {
  const { username, email } = await req.json()

  if (!username || !email) {
    return NextResponse.json({ error: 'Username and email are required' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    const newUser = await User.create({ username, email })
    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
