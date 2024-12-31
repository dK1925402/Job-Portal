import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getSaveJobs, savedJobs } from "../controllers/save.controller.js";
 
const router = express.Router();

router.route("/savejob/:id").get(isAuthenticated,savedJobs);
router.route("/get").get(isAuthenticated, getSaveJobs);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

