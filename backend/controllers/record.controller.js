

import Progress from "../models/Progress.model.js";

// Create new progress
export const pcreate = async (req, res, next) => {
  const {
    name,     // Include name in the destructuring
    Weekno,
    weight,
    Extime,
    meals,
    Wintake,
    sleepTime,
    RestDay,
    height
  } = req.body;

  const newmark = new Progress({
    name,     // Add name to the new Progress object
    Weekno,
    weight,
    Extime,
    meals,
    Wintake,
    sleepTime,
    RestDay,
    height
  });

  try {
    const savedProgress = await newmark.save(); // Save the new progress
    res.status(201).json(savedProgress);
  } catch (error) {
    next(error);
  }
};





export const pgetAll = async (req, res, next) => {
  try {
    const equipment = await Progress.find();

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




export const pdeletedata  = async (req, res, next) => {
  try {
    await Progress.findByIdAndDelete(req.params.ppId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};



export const pupdate = async (req, res, next) => {
  try {
    const updateequipment = await Progress.findByIdAndUpdate(
      req.params.pId,
      {
        $set: req.body // This will update all fields sent in the request body
      },
      { new: true }
    );
    if (!updateequipment) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};
