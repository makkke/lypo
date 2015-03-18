(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Ads', Ads);

  function Ads(Settings) {
    var publisherId = Settings.environment === 'production' ? 1100001518 : 0;
    var headerBannerAdSpaceId = Settings.environment === 'production' ? 130003534 : 0;
    var footerBannerAdSpaceId = Settings.environment === 'production' ? 130003533 : 0;

    var defaultCallback = function (status) {
      if(status === 'SUCCESS'){
        console.log('callBack is being called with status : ' + status);
      } else if (status === 'ERROR'){
        console.log('callBack is being called with status : ' + status);
      }
    };

    var service = {
      loadHeaderBanner: loadHeaderBanner,
      loadFooterBanner: loadFooterBanner,
    };

    return service;

    ////////////////////////////////

    function loadHeaderBanner(callback) {
      callback = callback || defaultCallback;
      SomaJS.loadAd({
        adDivId : 'header-ad',
        publisherId: publisherId,
        adSpaceId: headerBannerAdSpaceId,
        dimension: 'xxlarge'
      }, callback);
    }

    function loadFooterBanner(callback) {
      callback = callback || angular.noop;
      SomaJS.loadAd({
        adDivId : 'footer-ad',
        publisherId: publisherId,
        adSpaceId: footerBannerAdSpaceId,
        dimension: 'medrect'
      }, callback);
    }
  }

})();
