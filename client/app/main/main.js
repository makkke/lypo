'use strict';

angular.module('lypo.app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('main.lypos', {
        url: '/lypos',
        templateUrl: 'app/main/lypos/lypos.html',
        controller: 'LyposCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('main.authors', {
        url: '/authors',
        templateUrl: 'app/main/authors/authors.html',
        controller: 'AuthorsCtrl',
        controllerAs: 'vm',
        authenticate: true
      });
  });