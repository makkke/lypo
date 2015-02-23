(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('AuthorSearchCtrl', AuthorSearchCtrl);

  function AuthorSearchCtrl($modalInstance, Authors, Accounts) {
    var vm = this;

    vm.account = {};
    vm.accounts = [];

    vm.cancel = cancel;
    vm.create = create;

    activate();

    ////////////////////////////////

    function activate() {
      loadAccounts();
    }

    function create(form) {
      if(form.$valid) {
        Authors
          .create({ account: vm.account.id })
          .then(function (author) {
            $modalInstance.close(author);
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function loadAccounts() {
      Accounts
        .query()
        .then(function (accounts) {
          vm.accounts = accounts;
          console.log(accounts);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
})();