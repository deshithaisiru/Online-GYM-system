import express from 'express';
import {
    saveOTRecord,
    getAllOTRecords,
    searchOTRecords
} from '../../controllers/Employee/overtimeController.js';

const router = express.Router();

// Route for saving a new OT record
router.post('/', saveOTRecord);

// Route for getting all OT records from the database
router.get('/', getAllOTRecords);

// Route for searching OT records
router.get('/search-ot', searchOTRecords);

export default router;
