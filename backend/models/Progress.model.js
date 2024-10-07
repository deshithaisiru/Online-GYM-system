import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Weekno: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  Extime: {
    type: String, 
    required: true
  },
  meals: {
    type: String, 
    required: true
  },
  Wintake: {
    type: String, 
    required: true
  },
  sleepTime: {
    type: String, 
    required: true
  },
  RestDay: {
    type: String, 
    required: true
  },
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;