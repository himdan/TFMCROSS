"use strict";
app.directive('tfSearch', function(){
	return {
		restrict: 'A',
		scope: {
			map: '=',
			list:'='
		},
		link: function ($scope, element, attr) {
			var elm = element[0];
			var term = '';
			elm.addEventListener('input', function() {
				term = elm.value;
				$scope.$emit('searchTerm', {term:term});

			});
			

		},
		controller: function($scope, UrlFactory){
			
		}
	};

});