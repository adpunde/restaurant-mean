(function() {
'use strict';

angular.module('common', [])
.config(config)
.constant('ApiPath', 'https://davids-restaurant.herokuapp.com')
.constant('BasePath', 'https://raw.githubusercontent.com/jhu-ep-coursera/restaurant-server/blob/master/db');

config.$inject = ['$httpProvider'];
function config($httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');
};

})();
