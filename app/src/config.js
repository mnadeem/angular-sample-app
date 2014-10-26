'use strict';

angular.module('sample-app')
  .constant('APP_HOME_URL', '/xyz/app');

/**
 * @ngdoc overview
 * @name sample-app
 * @requires $httpProvider
 * @description
 *
 * Configures the @module sample-app $httpProvider to disable IE caching
 */
angular
  .module('sample-app')
  .config(['$httpProvider', '$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
 }]);

/**
 * @ngdoc overview
 * @name sample-app
 * @requires $stateProvider
 * @description
 *
 * Configures the @module sample-app $stateProvider
 */
angular
  .module('sample-app')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		
		// For any unmatched url, redirect to /plan
		$urlRouterProvider.otherwise("/plan");

		$stateProvider.state('plan', {
			url : '/plan',
			templateUrl : 'src/plan/main.tpl.html'
		}).state('details', {
			url : '/details',
			templateUrl : 'src/plan/details/main.tpl.html'
		}).state('summary', {
			url : '/summary',
			templateUrl : 'src/plan/summary/main.tpl.html'
		});
  }]); 

