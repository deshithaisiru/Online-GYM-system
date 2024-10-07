import Feedback from '../../models/Feedback/packageFeedback.js';

// Get all Feedback Details
export const getFeedbacks = async (req, res, next) => {
    try {
        const response = await Feedback.find();
        res.json({ response });
    } catch (error) {
        console.error('Error fetching Feedback data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Selected Feedback
export const getSelectedFeedback = async (req, res, next) => {
    const { pfID } = req.query;

    try {
        if (pfID) {
            const response = await Feedback.findOne({ pfID });
            if (response) {
                res.json({ response });
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } else {
            const response = await Feedback.find();
            res.json({ response });
        }
    } catch (error) {
        console.error('Error fetching Feedback data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create new Feedback
export const addFeedback = async (req, res, next) => {
    console.log('Received data:', req.body);
    const { pfID, cusName, cusEmail, pName, pfType, pfRate, pfNote, pfDate } = req.body;

    const feedback = new Feedback({
        pfID,
        cusName,
        cusEmail,
        pName,
        pfType,
        pfRate,
        pfNote,
        pfDate,
    });

    try {
        const response = await feedback.save();
        res.status(201).json({ response });
    } catch (error) {
        console.error('Error adding Feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update existing Feedback Details
export const updateFeedback = async (req, res, next) => {
    const { pfID, cusName, cusEmail, pName, pfType, pfRate, pfNote, pfDate } = req.body;

    try {
        const response = await Feedback.updateOne({ pfID }, { $set: { cusName, cusEmail, pName, pfType, pfRate, pfNote, pfDate } });
        if (response.nModified > 0) {
            res.json({ response });
        } else {
            res.status(404).json({ message: 'Feedback not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating Feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete existing Feedback
export const deleteFeedback = async (req, res, next) => {
    const { pfID } = req.body;
    
    try {
        const response = await Feedback.deleteOne({ pfID });
        if (response.deletedCount > 0) {
            res.json({ response });
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error deleting Feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get max Feedback ID
export const getMaxId = async (req, res, next) => {
    try {
        const response = await Feedback.find({}, { pfID: 1 }).sort({ pfID: -1 }).limit(1);
        const maxId = response.length > 0 ? response[0].pfID : 0;
        res.json({ maxId });
    } catch (error) {
        console.error('Error fetching max ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
