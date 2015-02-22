(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, Auth, $location, $window) {
    var vm = this;

    vm.credentials = {};
    vm.login = login;
    vm.loginOauth = loginOauth;

    activate();

    ////////////////////////////////

    function activate() {
    }

    function login(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth
          .login(vm.credentials)
          .then(function () {
            $location.path('/timeline');
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }
  }
})();
