import express from "express";
import {
  register,
  getUser,
  deleteUser,
  updateUser,
} from "../controller/user.js";
const router = express.Router();

router.post("/registration", register);
router.get("/getUser", getUser);
router.delete("/deleteUser", deleteUser);
router.patch("/updateUser", updateUser);
export default router;
