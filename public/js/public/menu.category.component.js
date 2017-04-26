(function() {
'use strict';

angular.module('public')
.component('menuCategory', {
    templateUrl: 'views/menu-category.html',
    bindings: {
        category: '<'
    }
});

})();
