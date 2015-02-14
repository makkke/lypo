(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($scope, $location, Auth) {
    var vm = this;

    vm.menu = [
      {
        'title': 'Timeline',
        'link': '/timeline'
      },
      {
        'title': 'Authors',
        'link': '/authors'
      }
    ];
    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.logout = logout;
    vm.isActive = isActive;

    function logout() {
      Auth.logout();
      $location.path('/login');
    }

    function isActive(route) {
      return route === $location.path();
    }
  }
})();