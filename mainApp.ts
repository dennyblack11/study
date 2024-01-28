import { Application, Request, Response } from "express";
import user from "./router/userRouter";
import study from "./router/studyRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/", user);
    app.use("/", study);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          msg: "Welcome to study API",
        });
      } catch (error) {
        return res.status(404).json({
          msg: "Error encountered",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
