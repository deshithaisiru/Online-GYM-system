import mongoose from 'mongoose';


const ItemsSchema = new mongoose.Schema({
 
  ItemsN: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true
  },
  descrip: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  image: {
   type:[ String],
   required: true
  },
  
});


const Items = mongoose.model('Items', ItemsSchema);

export default  Items;