import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model<ITeam>('Team', teamSchema);
