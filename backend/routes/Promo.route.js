import express from "express";
import { deletem, mgetAll, promocreate, updatem } from "../controllers/promo.controller.js";





const route = express.Router();


route.post("/pcreate", promocreate);
route.get("/pgetall", mgetAll);
route.put( '/proupdatee/:MMId', updatem);
route.delete( '/prodelete/:mId', deletem);







export default route;