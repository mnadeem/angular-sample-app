'use strict';

/**
 * @ngdoc directive
 * @module sample-app.components.confirmation.directives
 * @name ngReallyClick
 * @restrict A
 * @scope Isolated
 * @description
 * # ngReallyClick
 * Directive to get user confirmation
 */

angular.module('sample-app.components.confirmation.directives')
	.directive('ngReallyClick',['$log', '$modal', '$parse', function factory($log, $modal, $parse) {
		var directiveDefinitionObject = {
				restrict: 'A',
		        scope:{
		          ngReallyClick:"&"
		        },
		        //templateUrl: 'src/components/confirmation/confirmation.tpl.html',
		        link: function(scope, element, attrs) {
		        	 element.bind('click', function() {
		                 var message = attrs.ngReallyMessage || "Are you sure ?";

		                 //*This doesn't works
		                 var modalHtml = '<div><div class="row"><div class="columns">' + message + '</div></div><div class="row"><div class="small-5 columns"><button type="button" class="button right" ng-click="cancel()">Cancel</button></div><div class="small-5 columns"><button type="button" class="button primary left" ng-click="ok()">Confirm</button></div</div></div>';

		                 var modalInstance = $modal.open({
		                	 templateUrl: 'src/components/confirmation/confirmation.tpl.html',
		                	 //template: modalHtml,
		                	 resolve: {
	                	        confirmationMessage: function () {
	                	          return message;
	                	        }
	                	      },
		                	 controller: 'modalInstanceCtrl'
		                 });
		                 scope.$apply();
		                 modalInstance.result.then(function(confirmed) {
		                	 confirmed = confirmed || false;
		                	 //$parse method, this allows parameters to be passed
		                     var invoker = $parse(attrs.ngReallyClick);
		                     scope.ngReallyClick({confirmed:confirmed});
		                 }, function() {
		                	 $log.info('Confirmation Modal dismissed at: ' + new Date());
		                	 //$parse method, this allows parameters to be passed
		                     var invoker = $parse(attrs.ngReallyClick);
		                     scope.ngReallyClick({confirmed:false});
		                 });

		               });
		        }
		};
	    return directiveDefinitionObject;
	}]);
