const Order = require('../models/Order');

// Create a new order
const createOrder = (req, res) => {
  const {
    quantity,
    email,
    address,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    remark,
    shoppingExperience
  } = req.body;

  const newOrder = new Order({
    quantity,
    email,
    address,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    remark,
    shoppingExperience
  });

  newOrder.save()
    .then(order => {
      res.status(201).json(order);
    })
    .catch(error => {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Failed to create order' });
    });
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
      // Fetch orders from the database
const orders = await Order.find({}, 'orderId quantity email address deliveryDate deliveryTime paymentMethod remark shoppingExperience');
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };
  
// Get a single order by ID
// Get a single order by ID
const getOrderById = (req, res) => {
  const { id } = req.params;  // Corrected line

  Order.findById(id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    })
    .catch(error => {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Failed to fetch order' });
    });
};


// Update an order by ID
const updateOrderById = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Order.findByIdAndUpdate(id, updatedData, { new: true })
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    })
    .catch(error => {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Failed to update order' });
    });
};

// Assuming you are using Mongoose to interact with MongoDB
const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    console.log('Delete result:', order);    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};






module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
};