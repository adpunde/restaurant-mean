(function() {
'use strict';

angular.module('public')
.component('menuItem', {
    templateUrl: 'views/menu-item.html',
    bindings: {
        menuItem: '<',
        shortName: '<'
    },
    controller: MenuItemsController
});

MenuItemsController.$inject = ['BasePath'];
function MenuItemsController(BasePath) {
    var $ctrl = this;
    $ctrl.basePath = BasePath;
}

})();
