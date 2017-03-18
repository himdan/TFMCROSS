app.factory('profileFactory', function($http, $rootScope, $q){

	
	/**
	* Request configuration object
	* req object
	*	method string POST GET
	*	url string remote resouce of the web service
	*	data  object Json
	*	headers object request header
	*/
	var req = {
		method: 'POST',
		url:'',
		data:'',

		headers:{
			'Content-Type': 'Application/json',
			'Accept':'Application/json',

		}
	};
	/***
	* profile object
	*	account object
	*		firstname string
	*		lastname string
	* 		civility string
	*		alias string
	*		phone string
	*		email string
	*		description string
	*		address string
	*		birthday string
	*		picture object
	*			url string
	*			height: int
	*			width: int
	*			alt: string
	*/
	var profile = {
		account:{
			firstname: "",
			lastname: "",
			civility: "",
			alias: "",
			phone: "",
			email: "",
			description: "",
			address: "",
			birthday: "",
			picture: {
				url:'',
				height:'',
				width:'',
				alt:''
			}
		}
	};

	
	var factory = {
		getTfProfile: function(username, password){
			var q = $q.defer();
			req.method = 'POST';
			req.url = '';
			req.data = {
				'username':username,
				'password':password
			};
			$http(req).then(function(data) {
				
					q.resolve(profile.account);
				}, function(err) {
					q.reject(err);

				});
			return q.promise;

		},
		editCridential(person){
			var q = $q.defer();
			console.log(person);
			UrlFactory.getRemote('connect',function(url){
				var req = {
					method: 'POST',
					url:url,
					data: 'username=' + person.username + '&password=' + person.password + 
						'&newpassord=' + newpassord,
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
		},
		getFbProfile: function(){
			var q = $q.defer();
			req.method = 'GET';
			req.url = '';
			$http(req).then(function(data) {

				q.resolve(profile.account);

			}, function(err){
				q.reject(err);

			});
			return q.promise;

		},
		getGpProfile: function(){
			var q = $q.defer();
			req.method = 'GET';
			req.url = '';
			$http(req).then(function(data) {
				q.resolve(profile.account);            	
			}, function(err) {
				q.reject(err);
			});
			return q.promise;
		},
		mockProfile: function() {

		}
	};
	return factory;
});