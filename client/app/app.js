'use strict';

angular.module('lypo.app', [
  'lypo.settings',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'angularMoment'
])
.config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/timeline');

  $locationProvider.html5Mode(true);
})
.run(function ($rootScope, $location, Settings, Restangular, Auth) {
  // Configuring Restangular
  Restangular.setBaseUrl(Settings.apiUrl);
  Restangular.addFullRequestInterceptor(function () {
    return Auth.getHeaders();
  });
  Restangular.setErrorInterceptor(function (response) {
    if(response.status === 401) {
      $location.path('/login');
      Auth.logout();
      return false;
    }

    return true;
  });

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedInAsync(function (loggedIn) {
      if(next.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
})
.constant('angularMomentConfig', {
  preprocess: 'unix'
});