(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LyposCtrl', LyposCtrl);

  function LyposCtrl($scope, $window, $modal, Lypos) {
    var vm = this,
        title = 'Lypos | Lypo';

    vm.groups = [];
    vm.years = [];
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
          sortLypos();
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

    function sortLypos() {
      vm.years = [];

      _.each(vm.lypos, function (lypo) {
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
