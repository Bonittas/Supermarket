const Order = require('../models/Order');

const createOrder = (req, res) => {
  const {
    quantity,
    email,
    address,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    remark,
    shoppingExperience,
    cartItems

  } = req.body;

  const newOrder = new Order({
    quantity,
    email,
    address,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    remark,
    shoppingExperience,
    cartItems

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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('cartItems'); // Assuming 'cartItems' is the field name in your Order model

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  

const getOrderById = (req, res) => {
  const { id } = req.params; 

  Order.findById(id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch order' });
    });
};



const updateOrderById = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (JSON.stringify(existingOrder.toJSON()) === JSON.stringify(newData)) {
      return res.status(200).json({ message: 'No modifications were made to the order' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, newData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log('Order updated successfully:', updatedOrder);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};



const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    console.log('Delete result:', order);    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order edited successfully' });
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