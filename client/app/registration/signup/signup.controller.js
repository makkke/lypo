(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('SignupCtrl',

  function SignupCtrl($scope, Auth, $location, $window) {
    var vm = this,
        title = 'Log In | Lypo',
        signupButtonText = 'Create an Account';

    vm.account = {};
    vm.loading = false;
    vm.signupButtonText = signupButtonText;
    vm.emailError = false;
    vm.usernameError = false;

    vm.signup = signup;
    vm.loginOauth = loginOauth;

    activate();

    ////////////////////////////////

    function activate() {
      $window.document.title = title;
    }

    function signup(form) {
      if(form.$valid) {
        startLoading();
        Auth
          .signup(vm.account)
          .then(function () {
            stopLoading();
            $location.url('timeline');
          })
          .catch(function (err) {
            stopLoading();
            handleError(err);
          });
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
      vm.signupButtonText = signupButtonText;
    }

    function handleError(err) {
      console.log(err);
      if(err.errors.email) {
        vm.emailError = true;
      }
      if(err.errors.username) {
        vm.usernameError = true;
      }
    }
  });
})();
