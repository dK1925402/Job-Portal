import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteEvent, getAdminEvents, getAllEvents, getEventById, postEvent, updateEvent } from "../controllers/event.controller.js";
import { singleUploader } from "../middlewares/mutler.js";



const router = express.Router();

router.route("/post").post(singleUploader,isAuthenticated, postEvent);
router.route("/get").get(isAuthenticated, getAllEvents);
router.route("/getadminevents").get(isAuthenticated, getAdminEvents);
router.route("/get/:id").get(isAuthenticated, getEventById);
router.route("/update/:id").put(isAuthenticated,singleUploader,updateEvent);
router.route("/delete/:id").delete( deleteEvent);

export default router;

