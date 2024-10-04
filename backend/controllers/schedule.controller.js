

import Schedule from "../models/Schedule.model.js";



//form
export const create = async (req, res, next) => {
  const { 
    name,
    type,
    time,
    info,
    
    image } = req.body;

  const newmark = new Schedule({
    name,
    type,
    time,
    info,
    
    image
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};



export const addshedule = async (req, res, next) => {

  const { id } = req.params;
  const { schedule } = req.body; // Get the new schedule value from the request body

  try {
    // Find the schedule by ID and update the schedule field
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { schedule: schedule },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedSchedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.json({ success: true, updatedSchedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
 
};







export const getAll = async (req, res, next) => {
  try {
    const equipment = await Schedule.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const deleteds  = async (req, res, next) => {
  try {
    await Schedule.findByIdAndDelete(req.params.EEEId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};





