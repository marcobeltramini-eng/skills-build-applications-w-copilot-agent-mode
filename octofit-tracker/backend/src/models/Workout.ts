import { Schema, model, models, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    createdBy: { type: String, default: 'coach-bot' },
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;