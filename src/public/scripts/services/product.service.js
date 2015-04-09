(function(){
	"use strict";

	var productService = function($http, $filter){

		//Get products from database
		var getProducts = function(){
			return $http.get('api/products')
				.then( function(response){
					return response.data;
				});
		};

		//Get categories from database
		var getCategories = function(){
			return $http.get('api/categories')
				.then( function(response){
					return response.data;
				});
		};

		//Get product from database
		var getProduct = function(prodId){
			return $http.get('api/product/' + prodId)
				.then( function(response){
					return response.data;
				});
		};

		//Save product to database
		var saveProduct = function( product ){
			console.log(product);
			return $http.put('api/product/' + product.productId, { 'product' : product } )
				.then( function(response){
					return response.data;
				});
		};

		//Delete product from database
		var deleteProduct = function(prodId){
 			return $http.delete('api/product/' + prodId)
				.then( function(response){
					return response.data;
				});
		};

		//Filter products
		var filterProducts = function(data, prodId){
			for(var i = 0; i < data.length; i += 1){
		    	var product = data[i];
    			if(product.productId == prodId){
        			return product;
    			}
			}
		};

		return {
			saveProduct: saveProduct,
			deleteProduct: deleteProduct,
			getProduct : getProduct,
			getProducts: getProducts,
			getCategories: getCategories
		};
	};

	angular
		.module('app')
		.factory('productService', productService);
}());