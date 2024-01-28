import { Document, Schema, Types, model } from "mongoose";

interface iUser {
  email: string;
  userName: string;
  studyHistory: Array<{}>;
  password: string;
  studyPoints: number;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    email: { type: String, unique: true },
    userName: { type: String },
    password: { type: String },
    studyHistory: [{ type: Types.ObjectId, ref: "studies" }],
    studyPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);