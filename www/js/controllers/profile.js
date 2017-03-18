app.controller('ProfileCtrl', function($scope, $ionicPopup, $ionicPlatform, $timeout, $window, CameraService, UploadFactory, Gplus, Fb, profileFactory){
	
	$scope.show_image = false;
	$scope.image = {};
	$scope.image.src = '';
	$scope.user = {};

	$scope.$on('$ionicView.enter', function() {
		$scope.image.src = 'img/lotfi.jpg';
		Gplus.init();
		Fb.init();
	});

	$scope.$on('$ionicView.leave', function() {
		Gplus.reset();
		Fb.reset();
	});

	$scope.gplusLogin = function() {
		console.log('gplus login');
	};
	
	$scope.takePicture = function(){
		
		CameraService.takePicture().then(function(imageData) {
			$scope.image = {};
			$scope.image.src = imageData;
			$scope.show_image = true;
		}, function(err) {
			console.log(err);
			$scope.show_image = false;

		});
		
	};
	$scope.loadFromGallery = function() {
		
		CameraService.getPictureFromGallery().then(function(imageData) {
			$scope.image = {};
			$scope.image.src = imageData;
			$scope.show_image = true;
		}, function(err) {
			console.log(err);
			$scope.show_image = false;
		});
		
	};
	

	$scope.upload = function(image) {
		$scope.$broadcast('Debug', image);
	};
	$scope.showPopup = function() {
		var myPopup = $ionicPopup.show({
			templateUrl:'template/media-modal.html',
			title: 'Modifier photo de profile',
			subTitle: '',
			scope: $scope,
			buttons: [
			{ text: 'Anuller' },
			{
				text: '<b>Accepter</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!!angular.isDefined($scope.image.src)) {
						e.preventDefault();
					} else {
						return $scope.image.src;
					}
				}
			}
			]
		});

		myPopup.then(function(res) {
			if(res !=='') console.log('dump src:%o', res);
		});

		$timeout(function() {
			myPopup.close(); 
		}, 10000);
	};


	$scope.showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Consume Ice Cream',
			template: 'Are you sure you want to eat this ice cream?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				console.log('You are sure');
			} else {
				console.log('You are not sure');
			}
		});
	};


	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Don\'t eat that!',
			template: 'It might taste good'
		});

		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	};

	$scope.updatePassword = function(user) {
		console.log('update Password for:%o', user);
	};
	$scope.resetPassword = function(form){
		
		form.$setUntouched();
		console.log('reset pass for form:%o', form);
		//form.reset();
	};


});