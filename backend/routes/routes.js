import express from "express";
import {
  userRegister,
  userLogin,
  getStats,
  addStat,
  allStats,
  deleteUser,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/userLogin", userLogin);
router.post("/usersignup", userRegister);
router.get("/getStats/:userName", getStats);
router.post("/addStat/:userName", addStat);
router.get("/allUsers/", allStats);
router.delete("/deleteUser/:userName", deleteUser);

router.get("/", (req, res) => res.send("Hello from the server side!"));

export default router;
