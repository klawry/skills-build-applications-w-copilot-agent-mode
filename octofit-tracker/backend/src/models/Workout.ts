import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  title: string;
  focus: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMin: number;
  equipment: string[];
  instructions: string[];
  createdBy?: Types.ObjectId;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMin: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
