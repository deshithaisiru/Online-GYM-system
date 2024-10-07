import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  packname: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  price: {
    type: String, 
    required: true
  },
  validity: {
    type: Date, 
    required: true
  },
});

const Promo = mongoose.model('Promo', promoSchema);

export default Promo;
