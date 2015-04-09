(function(){  
    "use strict";

    angular
      .module("app.product", [])
      .controller("productController", productController);

    function productController($scope, $routeParams, $location, productService, cartService)
    {
      //Set product model object
      var modelProduct = function(product)
      {
        $scope.product = product;
      };

      //Set categories model object
      var modelCategories = function(categories)
      {
        $scope.categories = categories;
      };

      //Get back to the the product list page
      $scope.backToProducts = function(){
            $location.path( "/" );
      };  

      //Add the selected produt to the cart 
      $scope.addProdToCart = function(product){
        var quantity = this.quantity;
        cartService.addCartProduct(product.productId, product.name, product.price, quantity);
      };

      //----------------------Get from database---------------------
      //Get product
      productService.getProduct($routeParams.prodId)
        .then(modelProduct);

      //Get categories
      productService.getCategories()
        .then(modelCategories);
  
      //------------------------ADMIN-------------------------------
       //Get back to the admin page
      $scope.backToAdminProducts = function(){
            $location.path( "/admin" );
      };

      //Save product - either create a new or update an existing
      $scope.saveProduct = function(){
        var product = {
            "productId": $routeParams.prodId,
            "name": $scope.product.name, 
            "price": $scope.product.price,
            "category": $scope.product.category.category,
            "image": $scope.product.image
        };
        productService.saveProduct( product ).
        then( $location.path( "/admin" ) );
      };
  } 
}());