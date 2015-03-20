(function () {
  'use strict';

  angular
    .module('lypo.app')
    .factory('Ads', Ads);

  function Ads($timeout, $interval, Settings) {
    var refreshInterval = 60*1000; // 1m

    // TODO: move to settings on server
    var publisherId = Settings.showAds ? 1100001518 : 0;
    var headerBannerAdSpaceId = Settings.showAds ? 130003534 : 0;
    var footerBannerAdSpaceId = Settings.showAds ? 130003533 : 0;

    var headerBannerStop = null;
    var footerBannerStop = null;

    var defaultCallback = function (status) {
      if(status === 'SUCCESS'){
        console.log('callBack is being called with status : ' + status);
      } else if (status === 'ERROR'){
        console.log('callBack is being called with status : ' + status);
      }
    };

    var service = {
      headerBanner:  {
        load: loadHeaderBanner,
        unload: unloadHeaderBanner,
      },
      footerBanner:  {
        load: loadFooterBanner,
        unload: unloadFooterBanner,
      }
    };

    return service;

    ////////////////////////////////

    function loadHeaderBanner(callback) {
      callback = callback || defaultCallback;

      initHeaderBanner(callback);
      headerBannerStop = $interval(function () {
        initHeaderBanner(callback);
      }, refreshInterval);
    }

    function unloadHeaderBanner() {
      if(angular.isDefined(headerBannerStop)) {
        $interval.cancel(headerBannerStop);
        headerBannerStop = null;
      }
    }

    function initHeaderBanner(callback) {
      try {
        SomaJS.loadAd({
          adDivId : 'header-ad',
          publisherId: publisherId,
          adSpaceId: headerBannerAdSpaceId,
          dimension: 'xxlarge'
        }, callback);
      } catch (e) {
        initFooterBanner(callback);
      }
    }

    function loadFooterBanner(callback) {
      callback = callback || defaultCallback;

      initFooterBanner(callback);
      footerBannerStop = $interval(function () {
        initFooterBanner(callback);
      }, refreshInterval);
    }

    function unloadFooterBanner() {
      if(angular.isDefined(footerBannerStop)) {
        $interval.cancel(footerBannerStop);
        footerBannerStop = null;
      }
    }

    function initFooterBanner(callback) {
      try {
        SomaJS.loadAd({
          adDivId : 'footer-ad',
          publisherId: publisherId,
          adSpaceId: footerBannerAdSpaceId,
          dimension: 'medrect'
        }, callback);
      } catch (e) {
        initFooterBanner(callback);
      }
    }
  }

})();
