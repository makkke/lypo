(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('RegistrationCtrl', RegistrationCtrl);

  function RegistrationCtrl($scope, Ads) {
    // var vm = this;

    activate();

    ////////////////////////////////

    function activate() {
      $scope.$on('$destroy', function () {
        Ads.footerBanner.unload();
      });

      Ads.footerBanner.load();
    }
  }
})();
