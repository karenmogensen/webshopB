var mongoose        = require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment'),
    username        = 'karen',
    password        = 'piano001',   
    dbServer        = 'ds039211.mongolab.com:39211',
    dbName          = 'webshopdb';

var orderLineSchema = {
		productId: String,
		name: String,
		quantity: Number,
		price: Number
};
var schema = new mongoose.Schema({
        custName: String,
        custAddress: String,
        custZip: Number,
        custCity: String,
        custPhone: String,
        custMail: String,
        orderDate: Date,
        orderTotal: Number,
        orderLines: [orderLineSchema]
});


var conn = mongoose.createConnection('mongodb://' + username + ':' + password + '@' + dbServer + '/' + dbName);
autoIncrement.initialize(conn);

schema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderId', startAt: 1 });
module.exports = mongoose.model("Order", schema);
