(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorRemoveCtrl', AuthorRemoveCtrl);

  function AuthorRemoveCtrl($modalInstance, author) {
    var vm = this;

    vm.author = author;

    vm.cancel = cancel;
    vm.remove = remove;

    activate();

    ////////////////////////////////

    function activate() {
    }

    function remove() {
      vm.author
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