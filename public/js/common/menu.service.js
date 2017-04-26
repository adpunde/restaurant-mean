(function() {
'use strict';

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function() {
        return $http.get('/api/categories')
        .then(function (response) {
            return response.data;
        });
    }

    service.getMenuItems = function(category) {
        var config = {};
        if (category) {
            config.params = {'category' : category};
        }

        return $http.get('/api/menu_items', config)
        .then(function (response) {
            return response.data;
        });
    };
}

})();
