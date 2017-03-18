app.directive('tfDistance', function(){
	
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/Distance/distance.html',
		link: function (scope, element, attr) {
			console.log(element[0]);
			scope.$emit('getPosition', {});
		},
		controller: function($scope, UrlFactory,GeoFactory){


			console.log($scope.etablissement);
			$scope.$on('getPosition', function(e, pos){

				GeoFactory.getPosition().then(function(coordinate) {
					$scope.$broadcast('calculateDistance', coordinate);
					$scope.distance = 106;

				}, function(err) {
					console.log(err);
				});
				
			});
		}
	};

});