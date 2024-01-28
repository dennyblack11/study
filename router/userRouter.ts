import { Router } from "express";
import {
  createUser,
  findOneUser,
  getAllUsers,
  getUserStudyHistory,
  loginUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);
router.route("/get-one-user/:userID").get(findOneUser);
router.route("/get-history/:userID").get(getUserStudyHistory);
router.route("/get-all-user").get(getAllUsers);

export default router;
