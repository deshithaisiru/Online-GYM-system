
import Order from "../../models/Supplier/Order.model.js";



//recordagency
export const create = async (req, res, next) => {
  const { id,
    supname,
    productname,
    quantity,
    size,Emid} = req.body;

  const newmark = new Order({
    id,
    supname,
    productname,
    quantity,
    size,Emid
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};




export const getAll = async (req, res, next) => {
  try {
    const equipment = await Order.find();

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




export const deletedata  = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.EEEId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};



export const update = async (req, res, next) => {
  try {
    const updateequipment = await Order.findByIdAndUpdate(
      req.params.EId,
      {
        $set: {
          id: req.body.id,
          supname: req.body.supname,
          productname: req.body.productname,
          quantity: req.body.quantity,
          size: req.body.size,
          Emid: req.body.Emid
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};

