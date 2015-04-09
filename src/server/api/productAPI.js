var Product = require('../model/product');

var product = {
  //Get one product using productId
  read: function(req, res, next){
    Product.findOne({ 'productId': req.params.prodId }, function (err, product) {
      if (err) console.error;
      res.json(product);
    });
  },

  update: function(req, res, next){
    var newProd = new Product(req.body.product); 
    var updateData = newProd.toObject();
    delete updateData._id;
    Product.update({productId: newProd.productId}, updateData, {upsert:true}, function(err, data){
      if(err) console.error;
      else res.json("Saved: " + data);
    });    
  },

  delete: function(req, res, next){
    Product.findOneAndRemove({ 'productId': req.params.prodId }, function(err, data){
      if (err) console.error;
      else res.json("Deleted:" + data);
    });
  },
  getAll: function(req, res, next){
    Product.find(function(err, data){
      if(err) console.error;
      res.json(data);
    });
  } 
};

// Return the object
module.exports = product;