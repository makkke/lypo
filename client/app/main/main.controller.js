(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($scope, $timeout, Settings, Ads) {
    var vm = this;

    vm.year = Settings.currentYear;

    activate();

    ////////////////////////////////

    function activate() {
      $scope.$on('$destroy', function () {
        Ads.headerBanner.unload();
      });

      Ads.headerBanner.load();
    }
  }
})();
