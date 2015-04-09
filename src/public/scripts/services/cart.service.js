(function()
{
	"use strict";

	var cartService = function($filter, $http)
	{
        //Initialize cart products and cart total variables
        var cartProducts = [],
            cartTotal = 0;

        //Add product to cart
        var addCartProduct = function(id, name, price, quantity){
            //Find out if the product is already added to the cart
            var found = $filter('filter')(cartProducts, {id: id}, true);
            //If product already is added to cart - update quantity
            if(found.length)
            {
                found[0].quantity += quantity;
            }
            else
            {
                //Add product to cart
                cartProducts.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: quantity
                });
            }
            //Calculate the total order sum
            calculateCartTotal();
        };

        //Calculate totale order sum
        var calculateCartTotal = function(){
            cartTotal = 0;
            for(var i = 0; i < cartProducts.length; i += 1)
            {
                cartTotal += cartProducts[i].price * cartProducts[i].quantity;
            }
        };

        //Save order to database
        var saveOrder = function(order){
            return $http.post('api/order', { 'order': order } )
                .then( function(response){
                    return response.data;
                });
        };

        //Get orders from database
        var getOrders = function(){
            return $http.get('api/orders')
                .then( function(response){
                    return response.data;
                });
        };

        //Get cart products
        var getCartProducts = function(){
            return cartProducts;
        };

        //Get cart total
        var getCartTotal = function(){
            return cartTotal;
        };

        //Remove a product from the cart
        var removeProductFromCart = function(index)
        {
            cartProducts.splice( index, 1 );
        };

    	return{
            saveOrder : saveOrder,
            getOrders : getOrders,
            addCartProduct : addCartProduct,
            getCartProducts : getCartProducts,
            getCartTotal : getCartTotal,
            removeProductFromCart : removeProductFromCart
    	};
   	};

	angular
		.module('app')
		.factory('cartService', cartService);
}());