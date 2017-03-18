app.controller('bookmarkCtrl', function($scope, LocationFactory) {

	$scope.collection = [];
	$scope.is_loading = true;
	$scope.$on('$ionicView.enter', function() {
		$scope.loadEtablissement();
	});
	$scope.loadEtablissement = function() {
		LocationFactory.getAll().then(function(result) {
			console.log(result);
			$scope.collection = result.data;
			$scope.is_loading = false;
		}, function(err){
			console.log(err);
		});
	};

	$scope.$on('searchTerm', function(event, data){
		LocationFactory.search(data.term).then(function(result) {
			console.log(result);
			$scope.collection = result.data;
			$scope.is_loading = false;
		}, function(err){
			console.log(err);
		})

	});


});