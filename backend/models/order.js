const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({

  quantity: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: false
  },
  shoppingExperience: {
    type: String,
    required: true,
    default: 'default value' 

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cartItems: [cartItemSchema]

});

const Order = mongoose.model('NewOrders', orderSchema);

module.exports = Order;
