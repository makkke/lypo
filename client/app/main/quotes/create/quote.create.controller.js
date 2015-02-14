(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('QuoteCreateCtrl', QuoteCreateCtrl);

  function QuoteCreateCtrl($modalInstance, Quotes, Authors) {
    var vm = this;

    vm.quote = { at: new Date() };
    vm.authors = [];

    vm.cancel = cancel;
    vm.create = create;

    activate();

    ////////////////////////////////
    
    function activate() {
      loadAuthors();
    }

    function create(form) {
      if(form.$valid) {
        $modalInstance.close(vm.quote);
        Quotes
          .create(vm.quote)
          .then(function () {
            console.log('saved quote');
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function loadAuthors() {
      Authors
        .query() 
        .then(function (authors) {
          vm.authors = authors;
        });
    }
  }
})();