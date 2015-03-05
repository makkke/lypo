'use strict';

angular.module('lypo.app', [
  'lypo.settings',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'restangular',
  'angularMoment'
])
.config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/lypos');
  $locationProvider.html5Mode(true);
})
.run(function ($rootScope, $location, Settings, Restangular, Auth) {
  // Configuring Restangular
  Restangular.setBaseUrl(Settings.apiUrl);
  Restangular.addFullRequestInterceptor(function () {
    return Auth.getHeaders();
  });
  Restangular.setErrorInterceptor(function (response) {
    console.log(response);
    if(response.status >= 500) {
      console.log('server error');
      return false;
    }
    if(response.status === 401) {
      Auth.logout();
      $location.path('/login');
      return false;
    }

    return true;
  });

  // Set current account from Settings
  Auth.account = Settings.account;

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if(next.authenticate && !Auth.account) {
      $location.path('/login');
    }
  });
});