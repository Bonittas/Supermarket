const Order = require('../models/order');

const createOrder = (req, res) => {
  const {
    fname,
    lname,
    email,
    address,
    deliveryDate,
    deliveryTime,
    remark,
    shoppingExperience,
    cartItems
  } = req.body;

  const newOrder = new Order({
    fname,
    lname,
    email,
    address,
    deliveryDate,
    deliveryTime,
    remark,
    shoppingExperience,
    cartItems
  });

  newOrder.save()
    .then(order => {
      res.status(201).json(order);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to create order' });
    });
};

const getAllOrders = async (req, res) => {
  try {
    const { searchQuery, page, limit } = req.query;
    let query = {};

    if (searchQuery) {
      query = { 
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { categoryName: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    // Pagination logic
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch orders with pagination and search query
    const orders = await Order.find(query)
      .populate('cartItems')
      .skip(skip)
      .limit(pageSize);

    const totalOrdersCount = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrdersCount / pageSize),
      currentPage: pageNumber,
      totalOrders: totalOrdersCount
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  

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