import express from 'express';
import * as controller from '../../controllers/Feedback/instructFeedbackController.js';

const router = express.Router();

// Create router links
router.get('/instruct-feedbacks', controller.getFeedbacks);
router.get('/selected-instruct-feedback', controller.getSelectedFeedback);
router.post('/create-instruct-feedback', controller.addFeedback);
router.post('/update-instruct-feedback', controller.updateFeedback);
router.post('/delete-instruct-feedback', controller.deleteFeedback);
router.get('/get-instruct-feedbacks-maxid', controller.getMaxId);

export default router;
