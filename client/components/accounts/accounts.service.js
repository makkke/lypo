(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Accounts', Accounts);

  function Accounts(Restangular) {
    var route = 'accounts';

    var service = {
      me: me,
      query: query
    };

    return service;

    ////////////////////////////////

    function me() {
      return Restangular
        .one(route, 'me')
        .get();
    }

    function query() {
      return Restangular
        .all(route)
        .getList();
    }
  }

})();
