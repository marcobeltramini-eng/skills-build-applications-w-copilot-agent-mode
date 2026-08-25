import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    scope: { type: String, required: true, default: 'global' },
    entries: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        teamName: String,
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
