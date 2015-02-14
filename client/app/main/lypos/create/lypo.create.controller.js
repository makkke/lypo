(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LypoCreateCtrl', LypoCreateCtrl);

  function LypoCreateCtrl($modalInstance, Lypos, Authors) {
    var vm = this;

    vm.lypo = { at: new Date() };
    vm.authors = [];

    vm.cancel = cancel;
    vm.create = create;

    activate();

    ////////////////////////////////

    function activate() {
      loadAuthors();
    }

    function create(form) {
      if(form.$valid) {
        $modalInstance.close(vm.lypo);
        Lypos
          .create(vm.lypo)
          .catch(function (response) {
            console.error(response);
          });
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function loadAuthors() {
      Authors
        .query()
        .then(function (authors) {
          vm.authors = authors;
        });
    }
  }
})();