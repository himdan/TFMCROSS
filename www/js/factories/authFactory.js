app.factory('Authentificator', function($http) {

	var LOCAL_TOKEN_KEY = 'APIKEY';
	var username = '';
	var isAuthenticated = false;
	var authToken;
	var apikey='';    



	var storeUserCredentials= function (token) {

		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	};

	var useCredentials=function (token) {
		username = token.split('.')[0];
		isAuthenticated = true;
		authToken = token;

        apikey=token.split('.')[1];
    // Set the token as header for your requests!
    	//console.log($http.defaults.headers);
        $http.defaults.headers.common['X-Auth-Token'] = token.split('.')[1];

	};

	var destroyUserCredentials=function () {
		authToken = undefined;
		username = '';
		apikey=''  ;
		isAuthenticated = false;
	    $http.defaults.headers.common['X-Auth-Token'] = undefined;
	    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	 };

	return {
	  	loadUserCredential:function () {
			token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
	  		if(token) {
				useCredentials(token);
	  		}
		},  
		handleLogin: function(name, apikey) {
			storeUserCredentials(name + '.'+apikey);
		},
		logout: function() {
			destroyUserCredentials();
		},

		username: function() {
			return username;
		},
		isAuthenticated: function(){ 
			return isAuthenticated; 
		},
		apikey: function() {
			return apikey;
		}
	};
});