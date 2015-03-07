(function () {
  'use strict';

  angular
    .module('lypo.app')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($scope, $location, Auth) {
    var vm = this;

    vm.menu = getMenu();
    vm.account = Auth.account;
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
          'title': 'Lypos',
          'link': '/lypos'
        },
        {
          'title': 'Authors',
          'link': '/authors'
        }
      ];
    }

    function logout() {
      Auth.logout();
      $location.url('login');
    }

    function isActive(route) {
      return route === $location.path();
    }
  }
})();