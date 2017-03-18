app.service('Fb', function($window, $rootScope) {
	var service = {};
	var params = {};
	params.appId = '';

	$window.fbAsyncInit = function() {
		FB.init({ 
			appId: params.appId,
			status: true, 
			cookie: true, 
			xfbml: true,
			version: 'v2.4'
		});
	};
	$window.statusChangeCallback = function(response) {
		console.log('statusChangeCallback');
		console.log(response);
		if (response.status === 'connected') {
			testAPI();
		} else if (response.status === 'not_authorized') {

			$rootScope.fbStatus = 'Please log ' +
			'into this app.';
		} else {
			$rootScope.fbStatus = 'Please log ' +
			'into Facebook.'
		}
	};
	var testAPI = function () {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Successful login for: ' + response.name);
			$rootScope.fbStatus =
			'Thanks for logging in, ' + response.name + '!';
		});
	};
	$window.checkLoginState = function() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	};
	function loadFbApi() {
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.id = 'facebookSdk';
		po.src = 'https://connect.facebook.net/en_US/sdk.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);

	}
	function unloadFbApi() {
		var element = document.getElementById('facebookSdk');
		element.parentNode.removeChild(element);
	}
	/***
	* @parms appid string facebook appid
	*/
	service.init = function(appId){
		params.appId = appId;
		loadFbApi();
	};
	service.reset = function(){
		unloadFbApi();
	};
	return service;
});