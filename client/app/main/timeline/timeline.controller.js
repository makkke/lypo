(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('TimelineCtrl', TimelineCtrl);

  function TimelineCtrl($modal, Lypos) {
    var vm = this;

    vm.groups = [];
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
          sortGroups();
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
        sortGroups();
      });
    }

    function sortGroups() {
      vm.groups = [];
      _.each(vm.lypos, function (lypo) {
        var day = lypo.at.format('MMM D');
        var group = _.find(vm.groups, { day: day });
        if(group) {
          group.lypos.push(lypo);
        } else {
          vm.groups.push({
            day: day,
            lypos: [lypo]
          });
        }
      });
    }
  }
})();
