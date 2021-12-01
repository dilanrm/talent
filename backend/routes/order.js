const orderRoute = require('express').Router()
const OrderController = require('../controllers/OrderController');
const {authentication} = require('../middlewares/auth');

orderRoute.get('/', authentication, OrderController.getOrder);
orderRoute.post('/add', authentication, OrderController.addOrder);
orderRoute.get('/:id', OrderController.orderById);
orderRoute.put('/edit/:id', authentication, OrderController.editOrder);
orderRoute.delete('/delete/:id', authentication, OrderController.deleteOrder);

module.exports = orderRoute;