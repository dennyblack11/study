import { log } from "console";
import { CronJob } from "cron";
import { Request, Response } from "express";
import moment from "moment";
import lodash from "lodash";
import studyModel from "../model/studyModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { studyDuration, breakDuration, breakInterval } = req.body;

    const hourConvertOfDuration = +studyDuration * 60;

    const numberOfBreaks = hourConvertOfDuration / +breakInterval;

    const totalStudyTime =
      hourConvertOfDuration + numberOfBreaks * breakDuration;

    const user = await userModel.findById(userID);

    const getMinutes = new Date().setMinutes(totalStudyTime);

    const forCron = moment(getMinutes).format("h:mm:ss a");

    const study = await studyModel.create({
      totalStudyTime: `${totalStudyTime} minutes`,
      breakDuration: `${breakDuration} minutes`,
      studyDuration: `${studyDuration} hours`,
    });

    const cron = new CronJob(
      `${forCron.split(":")[1]} ${forCron.split(":")[0]} * * * `,
      async function () {
        await studyModel.findByIdAndUpdate(
          study?._id,
          { studyElapsed: true, studyPoint: +studyDuration },
          { new: true }
        );

        user!.studyPoints! = user?.studyPoints! + +studyDuration;
        user?.save();

        log("true");

        cron.stop();
      },
      null,
      true,
      "America/Los_Angeles"
    );

    user?.studyHistory.push(new Types.ObjectId(study._id));
    user?.save();

    cron.start();

    return res.status(201).json({
      msg: "Study created",
      data: study,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const addLessonLearnt = async (req: Request, res: Response) => {
  try {
    const { studyID } = req.params;
    const { lessonLearnt } = req.body;

    const update = await studyModel.findByIdAndUpdate(
      studyID,
      { lessonLearnt },
      { new: true }
    );

    return res.status(201).json({
      message: "Lesson added",
      data: update,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const getTopFive = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    const groupedByPoints = lodash.groupBy(users, "studyPoints");

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
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const getStudyByID = async (req: Request, res: Response) => {
  try {
    const { studyID } = req.params;

    const study = await studyModel.findById(studyID);

    return res.status(200).json({
      msg: "Top five gotten",
      data: study,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};

export const updateTimeElapsed = async (req: Request, res: Response) => {
  try {
    const { studyID } = req.params;

    const studyDuration = await studyModel.findById(studyID);

    const study = await studyModel.findByIdAndUpdate(
      studyID,
      { studyElapsed: true, studyPoint: +studyDuration?.studyDuration! },
      { new: true }
    );

    return res.status(200).json({
      msg: "Time elapsed",
      data: study,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating study",
      status: 404,
    });
  }
};
