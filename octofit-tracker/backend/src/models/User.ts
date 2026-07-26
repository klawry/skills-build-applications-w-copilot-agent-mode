import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    goals: { type: [String], default: [] },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
