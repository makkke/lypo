(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($scope, $location, Auth, Settings) {
    var vm = this;

    vm.menu = getMenu();
    vm.account = Settings.account;
    vm.isCollapsed = true;

    vm.logout = logout;
    vm.isActive = isActive;

    activate();

    ////////////////////////////////

    function activate() {
    }

    function getMenu() {
      return [
        {
          'title': 'Timeline',
          'link': '/timeline'
        },
        {
          'title': 'Authors',
          'link': '/authors'
        }
      ];
    }

    function logout() {
      Auth.logout();
      $location.path('/login');
    }

    function isActive(route) {
      return route === $location.path();
    }
  }
})();