(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorsCtrl', AuthorsCtrl);

  function AuthorsCtrl($modal, Authors) {
    var vm = this;

    vm.authors = [];
    vm.empty = true;

    vm.openCreate = openCreate;

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
          vm.empty = authors.length === 0;
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
