import { Schema, model, models, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    goals: [{ type: String, trim: true }],
    weeklyTarget: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = models.User || model('User', userSchema);

export default User;