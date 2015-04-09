(function(){  
    "use strict";

    var app = angular.module('app', ['ngRoute', 'app.products', 'app.cart', 'app.product', 'app.productadmin']);

    app.config(['$routeProvider', function ($routeProvider) {
    	//Setting up routing
        $routeProvider
        .when('/', {
    		templateUrl: 'views/products.html',
    		controller: 'productsController'
    	})
        .when('/product/:prodId', {
            templateUrl: 'views/product.html',
            controller: 'productController'
        })
        .when('/checkOut', {
            templateUrl: 'views/checkOut.html',
            controller: 'cartController'
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'productAdminController'
        })
        .when('/createNewProduct/:prodId', {
            templateUrl: 'views/admin/adminProduct.html',
            controller: 'productController'
        }).when('/orders', {
            templateUrl: 'views/admin/adminOrders.html',
            controller: 'cartController'
        });
    }]);
    //Setting up directives
    //Setting up reuable cart section as a directive
    app.directive('cartsection', [function () {
    	return {
    		restrict: 'E',
    		scope: false,
    		templateUrl: 'views/cart.html',
    		controller: 'cartController'
        };
    }]);
}());