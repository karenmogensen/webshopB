(function(){
    "use strict";

    angular
      .module("app.cart", [])
      .controller("cartController", cartController);

    function cartController($scope, $location, cartService)
    {
        //Set cartproducts in scope
        $scope.cartProducts = cartService.getCartProducts();

        //Check out button function 
        $scope.checkOut = function(){
            $location.path( "/checkOut" );
        }; 

        //Add orders to scope
        var modelOrders = function(data)
        {
            $scope.orders = data;
        };

        //Get orders from cart service
        cartService.getOrders()
            .then(modelOrders);

        //Show/hide cart section
    	$scope.showCartSection = function(){
    		if(Object.keys($scope.cartProducts).length){
            $scope.cartTotal = cartService.getCartTotal();
     			return true;
    		}
	    		return false;
    	};

        //Remove from cart button function
        $scope.removeProductFromCart = function(index){
            //Service removing a product from the cart
            cartService.removeProductFromCart(index);
        };

        //Save order button function
        $scope.saveOrder = function(){
            //Create array containing the products added to the cart
            var orderProducts = new Array($scope.cartProducts.length);
            for(var i=0; i<$scope.cartProducts.length; i++)
            {
                orderProducts[i] = {"productId" : $scope.cartProducts[i].id, 
                                    "name" : $scope.cartProducts[i].name,
                                    "quantity" : $scope.cartProducts[i].quantity,
                                    "price" : $scope.cartProducts[i].price };    
            }
            //Create a json order object
            var order = { "custName" : $scope.customer.name, 
                                    "custAddress" : $scope.customer.address,
                                    "orderDate" : Date(),
                                    "orderTotal" : $scope.cartTotal,
                                    "orderLines" : orderProducts};
            //Call service to save the order                        
            cartService.saveOrder(order);

            //Redirect to products page when order is saved.
            $location.path("/");
        };
    }
  
}());