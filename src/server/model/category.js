var mongoose = require('mongoose');

var schema = {
        category: String
};

module.exports = mongoose.model("Category", schema);
