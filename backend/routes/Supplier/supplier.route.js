import express from "express";
import { create,  deletedata, getAll,update} from "../../controllers/Supplier/supplier.controller.js";




const route = express.Router();

route.post("/createorder", create);
route.get("/getallorder", getAll);
route.put( '/updateeorder/:EId', update);
route.delete( '/deleteeq/:EEEId', deletedata);






export default route;