// Initialize the express framework

//Initalize variables
var express 	 	= require('express'),
	path			= require('path'),
	mongoose    	= require('mongoose'),
	username		= 'karen',
	password		= 'piano001',	
	dbServer		= 'ds039211.mongolab.com:39211',
	dbName 			= 'webshopdb';

// Initialize the body-parser
// in order to receive the request body
// in POST, PUT and DELETE
var	bodyParser		= require('body-parser');

// Setup Express 
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

// Register the routing
require('./routes/productRoutes')(app);
require('./routes/categoryRoutes')(app);
require('./routes/orderRoutes')(app);

//Setup db connection
mongoose.connect('mongodb://' + username + ':' + password + '@' + dbServer + '/' + dbName);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

// Function used to start up the server
function startServer(){
	var server = app.listen(process.env.PORT || 3000, function(){
		var port = server.address().port;
		console.log('Listening on port ' + port);
	});
}