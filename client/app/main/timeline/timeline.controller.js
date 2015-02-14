(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('TimelineCtrl', TimelineCtrl);

  function TimelineCtrl($modal, Quotes) {
    var vm = this;

    vm.quotes = [];
    vm.empty = true;

    vm.openCreate = openCreate;

    activate();

    ////////////////////////////////

    function activate() {
      loadQuotes();
    }

    function loadQuotes() {
      Quotes
        .query()
        .then(function (quotes) {
          vm.quotes = quotes;
          vm.empty = quotes.length === 0;
        });
    }

    function openCreate() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/quotes/create/quote.create.html',
        controller: 'QuoteCreateCtrl',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (quote) {
        vm.quotes.push(quote);
      });
    }
  }
})();
