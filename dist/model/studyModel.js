"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studyModel = new mongoose_1.Schema({
    studyElapsed: { type: Boolean, default: false },
    breakTime: { type: String },
    lessonLearnt: { type: String, default: "" },
    totalStudyTime: { type: String },
    studyPoint: { type: Number, default: 0 },
    studyDuration: { type: String },
    breakDuration: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("studies", studyModel);
