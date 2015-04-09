(function(){
    "use strict";

    //Define angular module
    angular
      .module("app.products", [])
      .controller("productsController", productsController);

    //Define product controller
    function productsController($scope, $location, productService, cartService)
    {
      //Initializing the categories selected array
      $scope.categoriesSelected = [];

      //Adding products to the model
      var modelProducts = function(data)
      {
        $scope.products = data;
      };

      //Adding categories to the model
      var modelCategories = function(data)
      {
        $scope.categories = data;
      };

      //Add product to cart button function
      $scope.addProdToCart = function(product){
        //Get quantity
        var quantity = this.quantity;
        this.quantity = 0;
        //Using cart service to add product to cart
        cartService.addCartProduct(product.productId, product.name, product.price, quantity);
      };

      //Admin products button function
      $scope.adminProducts = function(){
          //Redirect to admin products page
          $location.path( "/admin" );
       };      

      //Admin orders button function 
      $scope.adminOrders = function(){
          //Redirect to order admin page
          $location.path( "/orders" );
       };      

      //Get products from product service
      productService.getProducts()
        .then(modelProducts);

      //Get categories from product service
      productService.getCategories()
        .then(modelCategories);

      //Handling selecting/deselection categories
      $scope.categoryChanged = function(category){
        var i = $scope.categoriesSelected.indexOf(category);
        if(i > -1)
        {
          $scope.categoriesSelected.splice(i, 1);
        }
        else
        {
          $scope.categoriesSelected.push(category);
        }
      };  

      //Handling category filter
      $scope.categoryFilter = function(product){
        if($scope.categoriesSelected.length > 0)
        {
          if($scope.categoriesSelected.indexOf(product.category) < 0)
          {
            return;
          } 
        }
        return product;
      };

    }
}());