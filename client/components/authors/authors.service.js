(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Authors', Authors);

  function Authors(Restangular, Settings) {
    var route = 'authors';

    var service = {
      query: query,
      create: create,
    };

    return service;

    ////////////////////////////////

    function query() {
      return Restangular
        .all(route)
        .getList();
    }

    function create(author) {
      return Restangular
        .all(route)
        .post(author);
    }
  }

})();
