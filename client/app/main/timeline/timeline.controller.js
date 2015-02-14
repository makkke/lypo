(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('TimelineCtrl', TimelineCtrl);

  function TimelineCtrl($modal, Lypos) {
    var vm = this;

    vm.lypos = [];
    vm.empty = true;

    vm.openCreate = openCreate;

    activate();

    ////////////////////////////////

    function activate() {
      loadLypos();
    }

    function loadLypos() {
      Lypos
        .query()
        .then(function (lypos) {
          vm.lypos = lypos;
          vm.empty = lypos.length === 0;
        });
    }

    function openCreate() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/lypos/create/lypo.create.html',
        controller: 'LypoCreateCtrl',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (lypo) {
        vm.lypos.push(lypo);
      });
    }
  }
})();
