import mongoose from 'mongoose';

const otSchema = new mongoose.Schema({
    iD: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    otDate: {
        type: Date,  
        required: true,
    },
    otHrs: {
        type: Number,
        required: true,
    },
});

export const OT = mongoose.model('OT', otSchema);
