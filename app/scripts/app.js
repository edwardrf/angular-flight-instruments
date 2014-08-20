'use strict';

/**
 * @ngdoc overview
 * @name afiApp
 * @description
 * # afiApp
 *
 * Main module of the application.
 */
angular
  .module('afiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
