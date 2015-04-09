var category = require('../api/categoryAPI'),
	express 	 	= require('express');

module.exports = function(app)
{
	// Get all categories
	var categoryRouter = express.Router();

	categoryRouter.get('/api/categories', category.getAll);
	app.use(categoryRouter);
};