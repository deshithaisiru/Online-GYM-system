import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create Schema
const InstructFeedbackSchema = new Schema({
    ifID: Number,
    cusName: String,
    cusEmail: String,
    iName: String,
    ifType: String,
    ifRate: Number,
    ifNote: String,
    ifDate: Date,
});

const InstructFeedback = mongoose.model('InstructFeedback', InstructFeedbackSchema);

export default InstructFeedback;
