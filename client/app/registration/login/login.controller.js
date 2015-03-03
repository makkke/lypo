(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($window, $location, Auth, focus) {
    var vm = this,
        title = 'Log In | Lypo',
        loginButtonText = 'Log In';

    vm.credentials  = {};
    vm.error  = false;
    vm.loading = false;
    vm.loginButtonText = loginButtonText;

    vm.login      = login;
    vm.loginOauth = loginOauth;
    vm.reset      = reset;

    activate();

    ////////////////////////////////

    function activate() {
      $window.document.title = title;
    }

    function login(form) {
      if(form.$valid) {
        startLoading();
        Auth
          .login(vm.credentials)
          .then(function () {
            stopLoading();
            $location.path('/timeline');
          })
          .catch(function (err) {
            stopLoading();
            handleError(err);
          });
      } else if (!form.email.$error.required && !form.password.$error.required) {
        handleError();
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }

    function startLoading() {
      vm.loading = true;
      vm.error = false;
      vm.loginButtonText = 'Signing In...';
    }

    function stopLoading() {
      vm.loading = false;
      vm.loginButtonText = loginButtonText;
    }

    function handleError() {
      vm.error = true;
      vm.credentials.password = '';
      focus('password');
    }

    function reset() {
      vm.error = false;
    }
  }
})();
