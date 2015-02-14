(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('SignupCtrl',

  function SignupCtrl($scope, Auth, $location, $window) {
    var vm = this;

    vm.account = {
      fullname: 'Slava Ivanov',
      email: 'slava@gmail.com',
      password: 'test123'
    };
    vm.signup = signup;
    vm.loginOauth = loginOauth;

    activate();

    ////////////////////////////////
    
    function activate() {

    }

    function signup(form) {
      if(form.$valid) {
        Auth.signup(vm.account)
          .then( function() {
            $location.path('/timeline');
          })
          .catch(function (err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }
  });
})();
