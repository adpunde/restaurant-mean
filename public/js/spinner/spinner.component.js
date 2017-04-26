(function() {
'use strict';

angular.module('Spinner')
.component('spinner', {
    templateUrl: 'views/spinner.template.html',
    controller: SpinnerController
});

SpinnerController.$inject = [ '$rootScope' ];
function SpinnerController($rootScope) {
    var $ctrl = this;
    var listener;

    $ctrl.$onInit = function() {
        $ctrl.showSpinner = false;
        listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
    }

    $ctrl.$onDestroy = function() {
        listener();
    }

    function onSpinnerActivate(event, data) {
        $ctrl.showSpinner = data.on;
    }
};

})();
