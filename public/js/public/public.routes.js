(function() {
'use strict';

angular.module('public')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig($stateProvider) {
    $stateProvider
    .state('public', {
        abstract: true,
        templateUrl: 'views/public.html'
    })
    .state('public.home', {
        url: '/',
        templateUrl: 'views/public.home.html'
    })
    .state('public.menu', {
        url: '/menu',
        templateUrl: 'views/menu.html',
        controller: 'MenuController',
        controllerAs: 'menuCtrl',
        resolve: {
            menuCategories: ['MenuService', function(MenuService) {
                return MenuService.getCategories();
            }]
        }
    })
    .state('public.menuitems', {
        url: '/menu/{category}',
        templateUrl: 'views/menu-items.html',
        controller: 'MenuItemsController',
        controllerAs: 'menuItemsCtrl',
        resolve: {
            menuItems: ['$stateParams', 'MenuService', function($stateParams, MenuService) {
                return MenuService.getMenuItems($stateParams.category);
            }]
        }
    })
}

})();
