import express from "express";
import { pcreate,pdeletedata,pgetAll,pupdate} from "../controllers/record.controller.js";




const route = express.Router();

route.post("/create", pcreate);
route.get("/getall", pgetAll);
route.put( '/updatee/:pId', pupdate);
route.delete( '/delete/:ppId', pdeletedata);






export default route;