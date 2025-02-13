/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables')
}

const cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'personal_finance_app',
      })
      .then((mongoose) => {
        return mongoose
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
