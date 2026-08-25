import { Schema, model, models, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    scope: { type: String, enum: ['global', 'team'], default: 'global' },
    weeklyStart: { type: Date, required: true },
    entries: [leaderboardEntrySchema],
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default Leaderboard;