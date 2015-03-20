(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LyposCtrl', LyposCtrl);

  function LyposCtrl($scope, $window, $modal, Lypos) {
    var vm = this,
        title = 'Lypos | Lypo';

    vm.years = [];
    vm.loading = true;  // initial lypos loading indicator
    vm.busy = false;    // additional lypos loading indicator
    vm.done = false;    // all lypos loadedd indicator
    vm.filter = 'all';
    vm.params = {
      skip: 0,
      limit: 10,
      favorited: false
    };

    vm.openCreate = openCreate;
    vm.openRemove = openRemove;
    vm.isEmpty = isEmpty;
    vm.loadNextLypos = loadNextLypos;

    $scope.$watch('vm.filter', function (current, previous) {
      if(current && current !== previous) {
        if(current === 'all') {
          vm.params.favorited = false;
        } else {
          vm.params.favorited = true;
        }
        loadLypos();
      }
    });

    activate();

    ////////////////////////////////

    function activate() {
      $window.document.title = title;
      loadLypos();
    }

    function loadLypos() {
      vm.loading = true;
      vm.params.skip = 0;
      vm.params.limit = 10;
      Lypos
        .query(vm.params)
        .then(function (lypos) {
          vm.lypos = lypos;
          vm.empty = lypos.length === 0;
          sortLypos();
          vm.loading = false;
        });
    }

    function loadNextLypos() {
      if(vm.busy) { return; }
      vm.busy = true;
      vm.params.skip += vm.params.limit;
      Lypos
        .query(vm.params)
        .then(function (lypos) {
          if(lypos.length === 0) {
            vm.done = true;
          } else {
            sortLypos(lypos);
            vm.busy = false;
          }
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

    function sortLypos(lypos) {
      var lyposToSort = lypos || vm.lypos;
      if(!lypos) {
        vm.years = [];
      }

      _.each(lyposToSort, function (lypo) {
        var y = lypo.at.year();
        var m = lypo.at.month();
        var d = lypo.at.date();

        var year = _.find(vm.years, { year: y });
        if(year) {
          var month = _.find(year.months, { month: m });
          if(month) {
            var day = _.find(month.days, { day: d });
            if(day) {
              day.lypos.push(lypo);
            } else {
              month.days.push({ day: d, name: d, lypos: [lypo] });
            }
          } else {
            year.months.push({ month: m, name: moment.months()[m], days: [{ day: d, name: d, lypos: [lypo] }] });
          }
        } else {
          vm.years.push({
            year: y,
            name: y,
            months: [{ month: m, name: moment.months()[m], days: [{ day: d, name: d, lypos: [lypo] }] }]
          });
        }
      });
    }

    function isEmpty() {
      return vm.lypos && vm.lypos.length === 0;
    }
  }
})();
