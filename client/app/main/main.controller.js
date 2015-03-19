(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($timeout, Settings, Ads) {
    var vm = this;

    vm.year = Settings.currentYear;

    activate();

    ////////////////////////////////

    function activate() {
      $timeout(function () {
        Ads.loadHeaderBanner();
      }, 1000);
    }
  }
})();
