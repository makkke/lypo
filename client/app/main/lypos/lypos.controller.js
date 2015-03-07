(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LyposCtrl', LyposCtrl);

  function LyposCtrl($scope, $window, $modal, Lypos) {
    var vm = this,
        title = 'Lypos | Lypo';

    vm.groups = [];
    vm.loading = true;
    vm.filter = 'all';

    vm.openCreate = openCreate;
    vm.openRemove = openRemove;
    vm.isEmpty = isEmpty;

    $scope.$watch('vm.filter', function (current) {
      if(current) {
        if(current === 'all') {
          loadLypos();
        } else {
          loadLypos(true);
        }
      }
    });

    activate();

    ////////////////////////////////

    function activate() {
      $window.document.title = title;
      loadLypos();
    }

    function loadLypos(favorited) {
      favorited = favorited || false;
      vm.loading = true;
      Lypos
        .query({ favorited: favorited })
        .then(function (lypos) {
          vm.lypos = lypos;
          vm.empty = lypos.length === 0;
          sortGroups();
          vm.loading = false;
        });
    }

    function openCreate() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/lypos/create/lypo.create.html',
        controller: 'LypoCreateCtrl',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function () {
        loadLypos();
      });
    }

    function openRemove(lypo) {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/lypos/remove/lypo.remove.html',
        controller: 'LypoRemoveCtrl',
        controllerAs: 'vm',
        resolve: { lypo: function () { return lypo; } }
      });

      modalInstance.result.then(function () {
        loadLypos();
      });
    }

    function sortGroups() {
      vm.groups = [];
      _.each(vm.lypos, function (lypo) {
        var day = lypo.at.format('MMMM D');
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

    function isEmpty() {
      return vm.lypos && vm.lypos.length === 0;
    }
  }
})();
