import { Router } from "express";
import {
  addLessonLearnt,
  getTopFive,
  createStudy,
  getStudyByID,
  updateTimeElapsed,
} from "../controller/studyController";

const router: Router = Router();

router.route("/create-study/:userID").post(createStudy);
router.route("/get-top-five").get(getTopFive);
router.route("/add-lesson-learnt/:studyID").post(addLessonLearnt);
router.route("/get-study/:studyID").get(getStudyByID);
router.route("/update-elapsed/:studyID").patch(updateTimeElapsed);

export default router;

