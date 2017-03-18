app.factory('ConnectionFactory', function($http, $q, UrlFactory) {
	
	var factory = {};
	factory.register = function(person){

		UrlFactory.getRemote('inscription',function(url){
			var q = $q.defer();
			var req = {
				method: 'POST',
				url:url,
				data: 'nom=' + person.nom + '&prenom=' + person.prenom +
					   '&gender=' + person.gender + '&email=' + person.email,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept':'Application/json',

				}
	    	};
			$http(req).then(function(data) {
	        	q.resolve(data);
			}, function(err) {
				q.reject(err);
			});
			return q.promise;
		});

	};
	factory.login = function(person) {
		
		var q = $q.defer();
		console.log(person);
		UrlFactory.getRemote('connect',function(url){
			var req = {
				method: 'POST',
				url:url,
				data: 'username=' + person.username + '&password=' + person.password,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept':'Application/json',

				}
	    	};
	    	console.log(url);
			$http(req).then(function(data) {
	        	q.resolve(data);
			}, function(err) {
				q.reject(err);
			});
			
		});
		return q.promise;

	};
	factory.logout = function(person) {
		var q = $q.defer();
		UrlFactory.getRemote('logout',function(url){
			
			var req = {
				method: 'POST',
				url:url,
				data: 'apiKey='+ person.apiKey,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept':'Application/json',

				}
	    	};
			$http(req).then(function(data) {
	        	q.resolve(data);
			}, function(err) {
				q.reject(err);
			});
			
		});
		return q.promise;
	};
	factory.editCridential = function(person, newPassword) {
		var q = $q.defer();
		UrlFactory.getRemote('editCridential',function(url){
			var req = {
				method: 'POST',
				url:url,
				data:'apikey=' + person.apikey + '&password=' + person.password +
					 '&newPassword=' + newPassword,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept':'Application/json',

				}
	    	};
			$http(req).then(function(data) {
	        	q.resolve(data);
			}, function(err) {
				q.reject(err);
			});
			;
		});
		return q.promise
	};
	factory.editProfile = function(person) {
		var q = $q.defer();
		UrlFactory.getRemote('editProfile',function(url){
			var req = {
				method: 'POST',
				url:url,
				data:'apikey=' + person.apikey + '&username=' + person.username + 
					'&gender=' + person.gender +
					'&phone=' + person.phone + '&comment=' + person.comment,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept':'Application/json',

				}
	    	};
			$http(req).then(function(data) {
	        	q.resolve(data);
			}, function(err) {
				q.reject(err);
			});
			
		});
		return q.promise;
	};
	return factory;
});