import Promo from "../models/Promo.model.js";

export const promocreate = async (req, res, next) => {
  const { packname, details, price, validity } = req.body;  // Use packname and validity

  const newmark = new Promo({
    packname,  // Update to packname
    details,
    price,
    validity,  // Correct the typo from validtiy to validity
  });

  try {
    const savedPromo = await newmark.save();
    res.status(201).json(savedPromo);
  } catch (error) {
    next(error);
  }
};

export const mgetAll = async (req, res, next) => {
  try {
    const equipment = await Promo.find();

    if (equipment.length > 0) {
      res.json({
        message: "Promo details retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deletem = async (req, res, next) => {
  try {
    await Promo.findByIdAndDelete(req.params.mId);
    res.status(200).json("The promo has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatem = async (req, res, next) => {
  try {
    const updatedPromo = await Promo.findByIdAndUpdate(
      req.params.MMId,
      {
        $set: {
          packname: req.body.packname,  // Update to packname
          details: req.body.details,
          price: req.body.price,
          validity: req.body.validity,  // Correct the typo
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPromo);
  } catch (error) {
    next(error);
  }
};
