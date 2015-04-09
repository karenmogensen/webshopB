var mongoose = require('mongoose');

var schema = {
        productId: Number,
        name: String,
        price: Number,
        category: String,
        image: String
};

module.exports = mongoose.model("Product", schema);
