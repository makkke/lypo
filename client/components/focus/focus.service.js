(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('focus', Focus);

  function Focus($timeout) {
    var service = function (id) {
      $timeout(function() {
        var element = document.getElementById(id);
        if(element) {
          element.focus();
        }
      });
    };

    return service;
  }
})();