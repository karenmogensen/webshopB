(function(){  
    "use strict";

    //Define module
    angular
      .module("app.productadmin", [])
      .controller("productAdminController", productAdminController);

    //Define controller
    function productAdminController($scope, $routeParams, $location, productService, cartService)
    {
      //Initializing product id
      $scope.nextProdId = 0;

      //Adding products and next product id to scope
      var modelProducts = function(data)
      {
        $scope.products = data;
        $scope.nextProdId = $scope.products.length + 1;
      };

      //Getting products from product service
      productService.getProducts()
        .then(modelProducts);

      //Go to admin product button function
      $scope.goToAdminProduct = function(productId){
        //Setting next product id to be created
        if(productId === undefined){
          productId = $scope.nextProdId;
        }
        //redirect to create new product page
        $location.path( "/createNewProduct/" + productId);
      };

      //Setting up delete product button function
      $scope.deleteProduct = function(productId){
        //Delete product and refresh the model
        productService.deleteProduct(productId).
        then(productService.getProducts().
          then(modelProducts)
        );
      };
    }
}());