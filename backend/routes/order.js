const express = require("express")
const router = express.Router();
const {  createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById} = require('../controllers/order')


router.get('/order',getOrderById);
router.get('/order/list',getAllOrders);
router.post('/order',createOrder);
router.delete('/order/:id', updateOrderById );
router.patch('/order/:id', deleteOrderById );

module.exports= router