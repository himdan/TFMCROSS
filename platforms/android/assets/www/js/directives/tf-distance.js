"use strict";
app.directive('tfDistance', function(){
	
	return {
		restrict: 'A',
		scope: {

		},
		link: function ($scope, element, attr) {
			
			$scope.$emit('getPosition', {});
			$scope.$on('calculateDistance',function(e, pos){
					console.log(pos);
					var lat1 = pos.latitude;
					var lat2 = attr.lat;
					var lon1 = pos.longitude;
					var lon2 = attr.long;
					var html = '<i class="icon ion-navigate" style=""></i>' + 
						getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) +
						 'Km';
					element.html(html);
			})

		},
		controller: function($scope, UrlFactory,GeoFactory){

			$scope.$on('getPosition', function(e, pos){

				GeoFactory.getPosition().then(function(coordinate) {
					$scope.$broadcast('calculateDistance', coordinate);
					
				}, function(err) {
					console.log(err);
				});
				
			});
		}
	};

});