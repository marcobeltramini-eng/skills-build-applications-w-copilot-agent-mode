import { Schema, model, models, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['run', 'cycling', 'strength', 'yoga', 'hiit', 'swim'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;