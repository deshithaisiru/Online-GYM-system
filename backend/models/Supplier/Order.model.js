import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
 

  id: {
    type: Number,
    required: true
  },
  Emid: {
    type: Number,
    required: true
  },
  supname: {
    type: String,
    required: true
  },
  productname: {
    type: String,
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  size: {
    type: String, 
    required: true
  },
 
 
 
  
 
  
});


const Order = mongoose.model('Order', orderSchema);

export default  Order;