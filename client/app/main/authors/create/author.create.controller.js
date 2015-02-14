(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorCreateCtrl', AuthorCreateCtrl);

  function AuthorCreateCtrl($modalInstance, Authors) {
    var vm = this;

    vm.author = {};
    vm.cancel = cancel;
    vm.create = create;

    activate();

    ////////////////////////////////

    function activate() {
    }

    function create(form) {
      if(form.$valid) {
        $modalInstance.close(vm.author);
        Authors
          .create(vm.author)
          .catch(function (response) {
            console.log(response);
          });
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }
  }
})();