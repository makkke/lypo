(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('RegistrationCtrl', RegistrationCtrl);

  function RegistrationCtrl(Ads) {
    // var vm = this;

    activate();

    ////////////////////////////////

    function activate() {
      Ads.loadFooterBanner();
    }
  }
})();
