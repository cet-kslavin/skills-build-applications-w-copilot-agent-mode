import { Schema, model } from 'mongoose';

export interface IWorkout {
  name: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  suggestedFor: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, required: true },
    suggestedFor: [{ type: String }],
  },
  { timestamps: true }
);

export default model<IWorkout>('Workout', workoutSchema);
