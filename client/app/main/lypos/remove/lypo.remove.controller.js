(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LypoRemoveCtrl', LypoRemoveCtrl);

  function LypoRemoveCtrl($modalInstance, lypo) {
    var vm = this;

    vm.lypo = lypo;

    vm.cancel = cancel;
    vm.remove = remove;

    activate();

    ////////////////////////////////

    function activate() {
    }

    function remove() {
      vm.lypo
        .remove()
        .then(function () {
          $modalInstance.close();
        });
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }
  }
})();