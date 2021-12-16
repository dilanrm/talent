const lineItemRoute = require('express').Router()
const lineItemController = require('../controllers/LineItemController');
const { authentication } = require("../middlewares/auth");

lineItemRoute.get('/', authentication, lineItemController.getLineItem);
lineItemRoute.get('/orders', lineItemController.getItemByOrder);
lineItemRoute.post('/add', authentication, lineItemController.addLineItem);
lineItemRoute.put('/edit/:id', lineItemController.editLineItem);
lineItemRoute.put('/edits/:id', lineItemController.edit);
lineItemRoute.delete('/delete/:id', lineItemController.deleteItemLine);

module.exports = lineItemRoute;