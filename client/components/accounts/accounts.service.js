(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Accounts', Accounts);

  function Accounts(Restangular) {
    var route = 'accounts';

    var service = {
      me: me
    };

    return service;

    ////////////////////////////////
    
    function me() {
      return Restangular
        .one(route, 'me')
        .get();
    }
  }
  
})();
