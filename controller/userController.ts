import { log } from "console";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({ userName, email, password: hashed });

    return res.status(201).json({
      msg: "User created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error loggin user",
      status: 404,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    const decrypt = await bcrypt.compare(password, user?.password!);

    if (user && decrypt) {
      return res.status(200).json({
        msg: "Logging in user",
        data: user?._id,
      });
    } else {
      return res.status(404).json({
        msg: "User not found",
        data: user,
        status: 404,
      });
    }
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error logging in user",
      status: 404,
    });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      return res.status(200).json({
        msg: "Getting one user",
        data: user,
      });
    } else {
      return res.status(404).json({
        msg: "User not found",
        data: user,
        status: 404,
      });
    }
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      msg: "Getting all user",
      data: user,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const getUserStudyHistory = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel
      .findById(userID)
      .populate({ path: "studyHistory" });

    return res.status(200).json({
      msg: "Getting all user",
      data: user,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};