/// <reference path="../../typings/angularjs/angular.d.ts"/>
"use strict";

/**
 * @ngdoc overview
 * @name blogFeedApp
 * @description
 * # blogFeedApp
 *
 * Main module of the application.
 */
angular
  .module("blogFeedApp", [])
  .run(function($rootScope){
    $rootScope._ = _;
});
