var Order = require('../model/order');

var order = {
  create: function(req, res, next){

    var newOrder = new Order(req.body.order); 
    newOrder.save(function(err, data){
      if(err) console.error;
      else res.json("Created: " + data);
    });   
  },
  getAll: function(req, res, next){
    Order.find(function(err, data){
      if(err) console.error;
      res.json(data);
    });
  }

};

// Return the object
module.exports = order;