app.controller('AppCtrl', function($ionicPopup,$ionicPlatform,$ionicHistory,$scope, $ionicPopover, $http, $state, $ionicModal,$state,$ionicPopup, $cordovaOauth, ConnectionFactory, Authentificator, Dialog, Gplus) {
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
	window.cordovaOauth = $cordovaOauth;
    window.http = $http;
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
 		$cordovaOauth.facebook("240671806367399", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        alert(result.access_token);
        //displayData($http, result.access_token);
    },  function(error){
            alert("Error: " + error);
    });
 	};
 	$scope.gpLogin = function() {
 		$cordovaOauth.google("1008359935758-pkob13j43dk3sjm45v6s5jtti8ftt93s.apps.googleusercontent.com", 
 			["https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email"],
 			{client_secret: '56:82:20:07:C3:3C:95:22:08:40:CF:EB:8A:4E:ED:49:2B:7E:54:45',
            redirect_uri: 'http://localhost/callback'}).then(function(result) {
            alert(JSON.stringify(result));
        }, function(error) {
            alert(error);
        });
 	};

		function displayData($http, access_token)
		{
		    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
		        var name = result.data.name;
		        var gender = result.data.gender;
		        var picture = result.data.picture;

		        var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
		        html = html + "<tr><td>" + "Name" + "</td><td>" + name + "</td></tr>";
		        html = html + "<tr><td>" + "Gender" + "</td><td>" + gender + "</td></tr>";
		        html = html + "<tr><td>" + "Picture" + "</td><td><img src='" + picture.data.url + "' /></td></tr>";

		        html = html + "</tbody></table>";

		        document.getElementById("listTable").innerHTML = html;
		        $.mobile.changePage($("#profile"), "slide", true, true);
		    }, function(error) {
		        alert("Error: " + error);
		    });
		}
});