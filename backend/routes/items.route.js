import express from "express";
import { Cartcrete, deleteItem, deleteItems, deleteItemss, getAllItems, getCartItem, Itcreate, updateItem } from "../controllers/items.controller.js";

const router = express.Router();

// Updated route for creating an item
router.post('/create', Itcreate);
router.get('/IgetAll', getAllItems);
router.put('/Update/:itemId', updateItem);
router.delete('/delete/:ItemmId', deleteItem);
router.post('/Ccreate', Cartcrete);
router.get('/CgetAll/:CurrentuserId', getCartItem);
router.delete('/deletes/:itemsId', deleteItems);
router.delete('/deletesall/:CurrentuserId', deleteItemss);

export default router;
