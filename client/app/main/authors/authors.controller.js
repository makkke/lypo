(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorsCtrl', AuthorsCtrl);

  function AuthorsCtrl($scope, $modal, Authors) {
    var vm = this;

    vm.authors = [];
    vm.loading = true;

    vm.openCreate = openCreate;
    vm.openSearch = openSearch;
    vm.openRemove = openRemove;
    vm.isEmpty = isEmpty;

    activate();

    ////////////////////////////////

    function activate() {
      loadAuthors();
    }

    function loadAuthors() {
      vm.loading = true;
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

      modalInstance.result.then(function () {
        loadAuthors();
      });
    }

    function openSearch() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/authors/search/author.search.html',
        controller: 'AuthorSearchCtrl',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function () {
        loadAuthors();
      });
    }

    function openRemove(author) {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/authors/remove/author.remove.html',
        controller: 'AuthorRemoveCtrl',
        controllerAs: 'vm',
        resolve: { author: function () { return author; } }
      });

      modalInstance.result.then(function () {
        loadAuthors();
      });
    }

    function isEmpty() {
      return vm.authors && vm.authors.length === 0;
    }
  }
})();
