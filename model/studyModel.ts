import { Document, Schema, Types, model } from "mongoose";

interface iStudy {
  endTime: string;
  studyElapsed: boolean;
  totalStudyTime: string;
  breakTime: string;
  breakDuration: string;
  lessonLearnt: string;
  studyPoint: number;
  studyDuration: string;
  user: {};
}

interface iStudyData extends iStudy, Document {}

const studyModel = new Schema<iStudyData>(
  {
    studyElapsed: { type: Boolean, default: false },

    breakTime: { type: String },
    lessonLearnt: { type: String, default: "" },
    totalStudyTime: { type: String },
    studyPoint: { type: Number, default: 0 },
    studyDuration: { type: String },
    breakDuration: { type: String },
  },
  { timestamps: true }
);

export default model<iStudyData>("studies", studyModel);
