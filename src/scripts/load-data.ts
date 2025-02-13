import mongoose, { AnyObject } from 'mongoose'
import { connectToDatabase } from '../lib/mongodb.ts'
import fs from 'fs'
import path from 'path'

const jsonFilePath = path.join(
  process.cwd(),
  '/public/assets/personal-finance-app/starter-code/data.json',
)

async function loadData() {
  try {
    await connectToDatabase()
    console.log('Connected to MongoDB')

    const rawData = fs.readFileSync(jsonFilePath, 'utf-8')
    const data: Record<string, AnyObject[]> = JSON.parse(rawData)

    for (const [collectionName, content] of Object.entries(data)) {
      const collection = mongoose.connection.collection(collectionName)

      await collection.deleteMany({})
      console.log(`Cleared existing data in "${collectionName}"`)

      const documents = Array.isArray(content) ? content : [content]

      await collection.insertMany(documents)
      console.log(`Inserted ${documents.length} documents into "${collectionName}"`)
    }
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

loadData()
