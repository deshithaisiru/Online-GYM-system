import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    iD: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,  
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    noDate: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

     
});

export const Leave = mongoose.model('Leave', leaveSchema);
