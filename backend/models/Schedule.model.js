import mongoose from 'mongoose';


const scheduleSchema = new mongoose.Schema({
 

  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  info: {
    type: String, 
    required: true
  },
  schedule: {
    type: String, 
    default: "waiting",

  },
  image: {
    type: String, 
    required: true
  },
 
 
 
  
 
  
});


const Schedule = mongoose.model('Schedule', scheduleSchema);

export default  Schedule;