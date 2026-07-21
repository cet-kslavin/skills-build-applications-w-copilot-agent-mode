import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  user: Types.ObjectId;
  points: number;
  rank?: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
