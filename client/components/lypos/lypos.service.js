(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Lypos', Lypos);

  function Lypos(Restangular, Auth) {
    var route = 'lypos';

    Restangular.extendModel(route, extendModel);

    var service = {
      query: query,
      create: create,
      remove: remove,
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

    function remove(lypo) {
      return lypo.remove();
    }

    function extendModel(model) {
      model.at = moment(model.at);

      model.isAuthored = function () {
        // return model.creator.id === model.author.account;
        return model.author.account === Auth.account.id;
      };

      model.isCreated = function () {
        // return model.creator.id === model.author.account;
        return model.creator.id === Auth.account.id;
      };

      return model;
    }
  }

})();
