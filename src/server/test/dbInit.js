var mongoose = require('mongoose'),
	dbname = "webshopAppDB";

var Product = mongoose.model("Product", {
		productId: Number,
		name: String,
		price: Number,
		category: String,
		image: String
});

var Category = mongoose.model("Category", {
		category: String
});

var data = {
	products: [
		{
			productId: 1,
			name: "Napellus, album",
			price: 40,
			category: "Aconitum",
			image: "aconitum_napellus_album.jpg"
		},
		{
		    productId: 2,
		    name: "Havana Blues",
		    price: 25,
		    category: "Geranium",
		    image: "geranium_havana_blues.jpg"
		},
		{
		    productId: 3,
		    name: "Hola Guapa",
		    price: 30,
		    category: "Geranium",
		    image: "geranium_hola_guapa.jpg"
		},
    	{
	        productId: 4,
	        name: "Indian Summer",
	        price: 30,
	        category: "Helenium",
	        image: "helenium_indian_summer.jpg"
    	},
	    {
	        productId: 5,
	        name: "Ruby Tuesday",
	        price: 25,
	        category: "Helenium",
	        image: "helenium_ruby_tuesday.jpg"
	    }   	
	],
	categories : [
	    {
	        category: "Aconitum"
	    },
	    {
	        category: "Geranium"
	    },
	    {
	        category: "Helenium"
	    }
	]
};
mongoose.connect("mongodb://localhost/" + dbname);


var db = mongoose.connection;
db.on("error", console.error);
db.once("open", deleteProducts);

function deleteProducts(){
	Product.remove({}, function(err){
		if(err) console.log(err);
		insertProducts();
	});
}

function insertProducts(){
	console.info('Adding products to webshopAppDB');
	Product.create(data.products, function(error){
		if(error) console.error('Error: ' + error);
	});
	console.info('Done adding products to webshopAppDB');
	console.info('Adding categories to webshopAppDB');
	Category.create(data.categories, function(error){
		if(error) console.error('Error: ' + error);
	});
	console.info('Done adding categories to webshopAppDB');

}