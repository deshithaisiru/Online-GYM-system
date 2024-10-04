import express from "express";
import { addshedule, create,   deleteds, getAll} from "../controllers/schedule.controller.js";




const route = express.Router();

route.post("/Screate", create);
route.get("/Sgetall", getAll);
route.delete( '/sdelete/:EEEId', deleteds);
route.post("/updateSchedule/:id", addshedule);






export default route;