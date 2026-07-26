import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  city: string;
  motto: string;
  members: Types.ObjectId[];
  weeklyDistanceKm: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    weeklyDistanceKm: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
