var Category = require('../model/category');

var category = {
  getAll: function(req, res, next){
    Category.find(function(err, data){
      if( err ) console.error;
      res.json(data);
    });
  } 
};

// Return the object
module.exports = category;