// routes/leaveRoutes.js

import express from 'express';
import {
    saveLeave,
    getPendingLeaves,
    getApprovedLeaves,
    getRejectedLeaves,
    getLeaveById,
    updateLeave,
    approveLeave,
    rejectLeave,
} from '../../controllers/Employee/leaveController.js';

const router = express.Router();

// Route for saving a new leave record
router.post('/', saveLeave);

// Route for getting all pending leave records
router.get('/', getPendingLeaves);

// Route for getting all approved leave records
router.get('/approved', getApprovedLeaves);

// Route for getting all rejected leave records
router.get('/rejected', getRejectedLeaves);

// Route for getting one leave record by ID
router.get('/:id', getLeaveById);

// Route for updating leave details
router.put('/:id', updateLeave);

// Approve leave request
router.post('/approve/:leaveId', approveLeave);

// Reject leave request
router.post('/reject/:leaveId', rejectLeave);

export default router;
