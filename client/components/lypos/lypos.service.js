(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Lypos', Lypos);

  function Lypos(Restangular) {
    var route = 'lypos';

    var service = {
      query: query,
      create: create
    };

    return service;

    ////////////////////////////////

    function query() {
      return Restangular
        .all(route)
        .getList();
    }

    function create(lypo) {
      var model = angular.copy(lypo);
      model.author = lypo.author.id;
      return Restangular
        .all(route)
        .post(model);
    }
  }

})();
