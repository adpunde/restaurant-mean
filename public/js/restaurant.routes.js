(function() {
'use strict';

angular.module('restaurant')
.config(config);

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}

})();
