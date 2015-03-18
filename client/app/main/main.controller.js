(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl(Settings, Ads) {
    var vm = this;

    vm.year = Settings.currentYear;

    activate();

    ////////////////////////////////

    function activate() {
      Ads.loadHeaderBanner();
    }
  }
})();
