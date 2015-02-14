(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Quotes', Quotes);

  function Quotes(Restangular) {
    var route = 'quotes';

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

    function create(quote) {
      var model = angular.copy(quote);
      model.author = quote.author.id;
      return Restangular
        .all(route)
        .post(model);
    }
  }
  
})();
