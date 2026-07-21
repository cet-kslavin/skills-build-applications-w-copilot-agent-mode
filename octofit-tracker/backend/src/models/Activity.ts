import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned?: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IActivity>('Activity', activitySchema);
