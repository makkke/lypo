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
    }
  }
})();
