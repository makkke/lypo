(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl(Settings) {
    var vm = this;

    vm.year = Settings.currentYear;

    activate();

    ////////////////////////////////

    function activate() {
      var headerAdConfig = {
        siteid: 'e3ea0c5bd79945d6919e55459daad59e',
        slot: '4',
        manual: true,
        test: true,
        testdeviceid: '0001'
      };
      _inmobi.getNewAd(document.getElementById('header-ad'));
    }
  }
})();
