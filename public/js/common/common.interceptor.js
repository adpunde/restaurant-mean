(function() {
'use strict';

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
function LoadingHttpInterceptor($rootScope, $q) {
    var loadingCount = 0;
    var eventName = "spinner:activate";

    return {
        request: function(config) {
            // console.log('HTTP interceptor', config);
            if (++loadingCount === 1) {
                $rootScope.$broadcast(eventName, {on: true});
            }
            return config;
        },

        response: function(response) {
            if (--loadingCount === 0) {
                $rootScope.$broadcast(eventName, {on: false});
            }
            return response;
        },

        responseError: function(response) {
            if (--loadingCount === 0) {
                $rootScope.$broadcast(eventName, {on: false});
            }
            return $q.reject(response);
        }
    };
}

})();
