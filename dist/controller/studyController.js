"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeElapsed = exports.getStudyByID = exports.getTopFive = exports.addLessonLearnt = exports.createStudy = void 0;
const console_1 = require("console");
const cron_1 = require("cron");
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
const studyModel_1 = __importDefault(require("../model/studyModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
const createStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { studyDuration, breakDuration, breakInterval } = req.body;
        const hourConvertOfDuration = +studyDuration * 60;
        const numberOfBreaks = hourConvertOfDuration / +breakInterval;
        const totalStudyTime = hourConvertOfDuration + numberOfBreaks * breakDuration;
        const user = yield userModel_1.default.findById(userID);
        const getMinutes = new Date().setMinutes(totalStudyTime);
        const forCron = (0, moment_1.default)(getMinutes).format("h:mm:ss a");
        const study = yield studyModel_1.default.create({
            totalStudyTime: `${totalStudyTime} minutes`,
            breakDuration: `${breakDuration} minutes`,
            studyDuration: `${studyDuration} hours`,
        });
        const cron = new cron_1.CronJob(`${forCron.split(":")[1]} ${forCron.split(":")[0]} * * * `, function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield studyModel_1.default.findByIdAndUpdate(study === null || study === void 0 ? void 0 : study._id, { studyElapsed: true, studyPoint: +studyDuration }, { new: true });
                user.studyPoints = (user === null || user === void 0 ? void 0 : user.studyPoints) + +studyDuration;
                user === null || user === void 0 ? void 0 : user.save();
                (0, console_1.log)("true");
                cron.stop();
            });
        }, null, true, "America/Los_Angeles");
        user === null || user === void 0 ? void 0 : user.studyHistory.push(new mongoose_1.Types.ObjectId(study._id));
        user === null || user === void 0 ? void 0 : user.save();
        cron.start();
        return res.status(201).json({
            msg: "Study created",
            data: study,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.createStudy = createStudy;
const addLessonLearnt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studyID } = req.params;
        const { lessonLearnt } = req.body;
        const update = yield studyModel_1.default.findByIdAndUpdate(studyID, { lessonLearnt }, { new: true });
        return res.status(201).json({
            message: "Lesson added",
            data: update,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.addLessonLearnt = addLessonLearnt;
const getTopFive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        const groupedByPoints = lodash_1.default.groupBy(users, "studyPoints");
        const topFive = Object.entries(groupedByPoints)
            .sort((a, b) => +b[0] - +a[0])
            .slice(0, 5)
            .map(([studyPoints, users]) => ({
            studyPoints: +studyPoints,
            users,
        }));
        return res.status(200).json({
            msg: "Top five gotten",
            data: topFive,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.getTopFive = getTopFive;
const getStudyByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studyID } = req.params;
        const study = yield studyModel_1.default.findById(studyID);
        return res.status(200).json({
            msg: "Top five gotten",
            data: study,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.getStudyByID = getStudyByID;
const updateTimeElapsed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studyID } = req.params;
        const studyDuration = yield studyModel_1.default.findById(studyID);
        const study = yield studyModel_1.default.findByIdAndUpdate(studyID, { studyElapsed: true, studyPoint: +(studyDuration === null || studyDuration === void 0 ? void 0 : studyDuration.studyDuration) }, { new: true });
        return res.status(200).json({
            msg: "Time elapsed",
            data: study,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.updateTimeElapsed = updateTimeElapsed;
