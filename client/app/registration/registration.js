(function () {
  'use strict';

  angular
    .module('lypo.app')
    .config(Config);

  function Config($stateProvider) {
    $stateProvider
      .state('registration', {
        abstract: true,
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationCtrl'
      })
      .state('registration.login', {
        url: '/login',
        templateUrl: 'app/registration/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('registration.signup', {
        url: '/signup',
        templateUrl: 'app/registration/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      })
      .state('registration.forgot', {
        url: '/forgot?from',
        templateUrl: 'app/registration/forgot/forgot.html',
        controller: 'ForgotCtrl',
        controllerAs: 'vm'
      });
  }
})();