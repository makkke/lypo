(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LypoCreateCtrl', LypoCreateCtrl);

  function LypoCreateCtrl($modalInstance, Lypos, Authors) {
    var vm = this;

    vm.lypo = { at: moment() };
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
        Lypos
          .create(vm.lypo)
          .then(function (lypo) {
            $modalInstance.close(lypo);
          })
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