import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'strength' | 'yoga';
  durationMin: number;
  distanceKm?: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga'],
      required: true,
    },
    durationMin: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
