
app.controller('HomeCtrl', function($scope, $ionicPopover, $http, $ionicModal,  $state, $ionicPopup,GeoFactory,LocationFactory) {

	
	
	$scope.map = {};
	$scope.map.show = false;
	$scope.map.load = true;
	var config = {};
	

	$scope.$on('$ionicView.enter', function(){

		$scope.mockinit();
		
		
		
	});
	$scope.$on('$ionicView.leave', function(){

		$scope.$broadcast('DestroyMap');
	});
	$scope.$on('$destroy', function() {
		console.log('HomeCtrl scope destroyed');
	});
	$scope.$on('searchTerm', function(event, data) {
		$scope.filterBySearch(data.term);

	});

	$scope.mockinit = function() {

		config.markers = [];
		config.markers = LocationFactory.mockOnlyMarkers();
		$scope.config = {};
		$scope.config.markers = config.markers;
		
		$scope.localize();
	};

	$scope.localize = function(){
		GeoFactory.getPosition().then(function(pMarker) {
			$scope.pmarker = pMarker;
			config.markers = LocationFactory.addMarker(pMarker);
			$scope.$broadcast('GeoLocalization', {"config":config} );

		}, function(err) {
			$scope.$broadcast('GeoLocalizationFaillure', err);
		});
	};
	$scope.relocalize = function(){

		GeoFactory.WatchPosition().then(function(pMarker) {
			$scope.marker = pMarker;
			config.markers = LocationFactory.addMarker(pMarker);
			$scope.$broadcast('GeoLocalization', {"config":config} );

		}, function(err) {
			$scope.$broadcast('GeoLocalizationFaillure',err);
		});

	};

	$scope.filterRestaurant = function(){
		console.log('filter resaturant');
		$scope.filterBy(0);

	};
	
	$scope.filterCafe = function() {
		console.log('filter Cafe');
		$scope.filterBy(1);
	};

	$scope.filterPatisserie = function() {
		console.log('filter Patisserie');
		$scope.filterBy(2);
	};

	$scope.filterGlacier = function() {
		console.log('filter Glacier');
		$scope.filterBy(3);
	};

	$scope.filterAll = function(){
		$scope.$broadcast('GeoLocalization', {"config":config} );
	};

	$scope.filterBy = function(filter) {
		var filtred = {markers:[]};
		filtred.markers = LocationFactory.filterBy(config.markers, filter);
		$scope.$broadcast('GeoLocalization', {"config":filtred} );


	};

	$scope.filterBySearch = function(term) {
		
		LocationFactory.search(term).then(
			function(response){
				var collection = response.data;
				console.log(collection);
				var config = {};
				config.markers = LocationFactory.mockOnlyMarkers();
				//config.markers = [];
				angular.forEach(collection, function(etb, idx) {
					var marker = {
						address:etb.address,
						latitude:etb.latitude,
						longitude:etb.longitude,
						icon:etb.icon,
						title:etb.title,
						link:'',
						is_centered:false,
						type:[],
						information:{}
					};
					marker.is_centered = true;
					marker.information = {
					image:{url:etb.image,height:100,width:120,alt:etb.title},
					description:etb.address
				};
					config.markers.push(marker);
				});
				$scope.$broadcast('GeoLocalization', {"config":config} );
		}, function(err){

				$scope.$broadcast('GeoLocalizationFaillure', err);
		});
	};

	






	


});