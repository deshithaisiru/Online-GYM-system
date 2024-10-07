import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create Schema
const PackageFeedbackSchema = new Schema({
    pfID: Number,
    cusName: String,
    cusEmail: String,
    pName: String,
    pfType: String,
    pfRate: Number,
    pfNote: String,
    pfDate: Date,
});

const PackageFeedback = mongoose.model('PackageFeedback', PackageFeedbackSchema);

export default PackageFeedback;
