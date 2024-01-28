"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    email: { type: String, unique: true },
    userName: { type: String },
    password: { type: String },
    studyHistory: [{ type: mongoose_1.Types.ObjectId, ref: "studies" }],
    studyPoints: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
