var product = require('../api/productAPI'),
	express = require('express');

module.exports = function(app)
{
	var productRouter 	= express.Router();

	// Get all products
	productRouter.get('/api/products', product.getAll);

	// Get one product, create or update one product, delete one product
	productRouter.route('/api/product/:prodId')
		.get(product.read)
		.put(product.update)
		.delete(product.delete);

	app.use(productRouter);
};