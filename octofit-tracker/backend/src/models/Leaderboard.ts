import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
