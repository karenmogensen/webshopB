var order = require('../api/orderAPI'),
	express = require('express');

module.exports = function(app)
{
	var orderRouter 	= express.Router();

	// Get all orders
	orderRouter.get('/api/orders', order.getAll);

	// Create a new order
	orderRouter.post('/api/order', order.create);

	app.use(orderRouter);
};