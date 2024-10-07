import mongoose from "mongoose";

const { Schema, model } = mongoose;

const packageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "userModel", required: true },
    packname: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    validity: { type: Number, required: true }, // Validity in days
  },
  { timestamps: true }
);

export default model("Package", packageSchema);
