import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

export const User = models.User || model('User', UserSchema)
