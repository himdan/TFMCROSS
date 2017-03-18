app.controller('AppCtrl', function($ionicPopup,$ionicPlatform,$ionicHistory,$scope, $ionicPopover, $http, $state, $ionicModal,$state,$ionicPopup, ConnectionFactory, Authentificator, Dialog) {
	$ionicHistory.nextViewOptions({
		disableBack: true
	});
	$ionicPlatform.registerBackButtonAction(function (event) {
		if($state.current.name == "menu.home"){


			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmation',
				template: "voulez vous quitter l'application",
				cancelText: 'Annuler',
				okText: 'Confirmer'
			});

			confirmPopup.then(function(res) {
				if(res) {
					navigator.app.exitApp();
				} else {
					console.log('You are not sure');
				}
			}); 
		} else { 
			navigator.app.backHistory();
		}
	}, 100);
	$scope.person = {};
	$scope.login = function() {
 		
 		console.log($scope.person);
 		ConnectionFactory.login($scope.person).then(function(response) {
 			if(response.data.success){
 				apikey = response.data.result.apikey;
 				name = response.data.result.username;
 				Authentificator.handleLogin(name, apikey);
 				$state.go('menu.home');
 			} else {
 				//connection faillure handler;
 				Dialog.alert('Non d\'utlisateur ou mot de passe pas correct');
 			}
 		}, function(err) {
 			console.log(err);
 		});
 	};
 	$scope.logout = function() {
 		Authentificator.logout();
 	};
 	$scope.fbLogin = function() {
 		console.log('fb login');
 	};
 	$scope.gpLogin = function() {
 		console.log('gp login');
 	};


});