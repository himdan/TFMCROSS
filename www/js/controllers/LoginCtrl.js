app.controller('LoginCtrl', function($scope, connectionFactory){
 	$scope.login = function() {
 		$scope.person = {
 			username:$scope.username,
 			password:$scope.password
 		};
 		connectionFactory.login(person).then(function(response) {
 			console.log(response);
 		}, function(err) {
 			console.log(err);
 		});
 	};
 	$scope.logout = function() {

 	};
});