import { Schema, model, models, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = models.Team || model('Team', teamSchema);

export default Team;