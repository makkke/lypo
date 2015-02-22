(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorsCtrl', AuthorsCtrl);

  function AuthorsCtrl($scope, $modal, Authors) {
    var vm = this;

    vm.authors = [];
    vm.empty = true;
    vm.loading = true;

    vm.openCreate = openCreate;

    $scope.$watch('vm.authors', function (current) {
      vm.empty = true;
      if(current) {
        vm.empty = current.length === 0;
      }
    });

    activate();

    ////////////////////////////////

    function activate() {
      loadAuthors();
    }

    function loadAuthors() {
      Authors
        .query()
        .then(function (authors) {
          vm.authors = authors;
          vm.loading = false;
        });
    }

    function openCreate() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/authors/create/author.create.html',
        controller: 'AuthorCreateCtrl',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (author) {
        vm.authors.push(author);
      });
    }
  }
})();
