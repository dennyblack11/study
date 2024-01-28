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
exports.getUserStudyHistory = exports.getAllUsers = exports.findOneUser = exports.loginUser = exports.createUser = void 0;
const console_1 = require("console");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({ userName, email, password: hashed });
        return res.status(201).json({
            msg: "User created successfully",
            data: user,
            status: 201,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error loggin user",
            status: 404,
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        const decrypt = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user && decrypt) {
            return res.status(200).json({
                msg: "Logging in user",
                data: user === null || user === void 0 ? void 0 : user._id,
            });
        }
        else {
            return res.status(404).json({
                msg: "User not found",
                data: user,
                status: 404,
            });
        }
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error logging in user",
            status: 404,
        });
    }
});
exports.loginUser = loginUser;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            return res.status(200).json({
                msg: "Getting one user",
                data: user,
            });
        }
        else {
            return res.status(404).json({
                msg: "User not found",
                data: user,
                status: 404,
            });
        }
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.findOneUser = findOneUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(200).json({
            msg: "Getting all user",
            data: user,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserStudyHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default
            .findById(userID)
            .populate({ path: "studyHistory" });
        return res.status(200).json({
            msg: "Getting all user",
            data: user,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.getUserStudyHistory = getUserStudyHistory;
