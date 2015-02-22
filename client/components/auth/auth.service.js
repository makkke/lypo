(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Auth', Auth);

  function Auth($location, $rootScope, $http, Accounts, $cookieStore, $q, Settings) {
    var service = {
      getHeaders: getHeaders,
      // isLoggedInAsync: isLoggedInAsync,
      // isLoggedIn: isLoggedIn,

      login: login,
      logout: logout,
      signup: signup,
      // getCurrentAccount: getCurrentAccount,
    };

    return service;

    ////////////////////////////////

    /**
     * Authenticates user and saves token
     *
     * @param  {Object} credentials
     * @param  {Function} callback
     * @return {Promise}
     */
    function login(credentials) {
      var deferred = $q.defer();

      $http
        .post('/auth/local', credentials)
        .success(function (data) {
          $cookieStore.put(Settings.tokenName, data.token);
          Accounts
            .me()
            .then(function (account) {
              Settings.account = account;
              deferred.resolve();
            });
        })
        .error(function (err) {
          logout();
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /**
     * Deletes access token and account info
     */
    function logout() {
      $cookieStore.remove(Settings.tokenName);
      Settings.account = {};
    }

    /**
     * Generates headers based on token
     *
     * @return {Object}
     */
    function getHeaders() {
      var token = $cookieStore.get(Settings.tokenName),
          config = {};

      if(token) {
        config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
          }
        };
      }

      return config;
    }

    // /**
    //  * Checks if a account is logged in
    //  *
    //  * @return {Boolean}
    //  */
    // function isLoggedIn() {
    //   return currentAccount.hasOwnProperty('fullName');
    // }

    // /**
    //  * Waits for currentAccount to resolve before checking if account is logged in
    //  */
    // function isLoggedInAsync(callback) {
    //   if('then' in currentAccount) {
    //     currentAccount
    //       .then(function (account) {
    //         currentAccount = account;
    //         callback(true);
    //       })
    //       .catch(function() {
    //         callback(false);
    //       });
    //   }
    //   else if(currentAccount.hasOwnProperty('name')) {
    //     callback(true);
    //   }
    //   else {
    //     callback(false);
    //   }
    // }

    /**
     * Creates a new account
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function signup(account) {
      var deferred = $q.defer();

      $http
        .post('api/accounts', account)
        .success(function (data) {
          $cookieStore.put(Settings.tokenName, data.token);
          Accounts
            .me()
            .then(function (account) {
              Settings.account = account;
              deferred.resolve();
            });
        })
        .error(function (err) {
          this.logout();
          deferred.reject(err);
        });

      return deferred.promise;
    }

    //   /**
    //    * Change password
    //    *
    //    * @param  {String}   oldPassword
    //    * @param  {String}   newPassword
    //    * @param  {Function} callback    - optional
    //    * @return {Promise}
    //    */
    //   changePassword: function(oldPassword, newPassword, callback) {
    //     var cb = callback || angular.noop;

    //     return User.changePassword({ id: currentAccount._id }, {
    //       oldPassword: oldPassword,
    //       newPassword: newPassword
    //     }, function(user) {
    //       return cb(user);
    //     }, function(err) {
    //       return cb(err);
    //     }).$promise;
    //   },

    // *
    //  * Gets all available info on authenticated user
    //  *
    //  * @return {Object} user

    // function getCurrentAccount() {
    //   return currentAccount;
    // }

    //   /**
    //    * Get auth token
    //    */
    //   getToken: function() {
    //     return $cookieStore.get('token');
    //   }
    // };
  }
})();
