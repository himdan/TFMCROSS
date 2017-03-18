app.service('Gplus', function($window, $rootScope){
	
	
	var service = {};
	var params = {}
	params.GpApiKey = '';
	params.GpClientId = '';
	params.id = '';

	$window.onGPLoadCallback = function()
	{
		gapi.client.setApiKey(params.GpApiKey);
		gapi.client.load('plus', 'v1', function(){});
	};

	function loadGPApi() {
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.id = 'gplusSdk';
		po.async = true;
		po.src = 'https://apis.google.com/js/client.js?onload=onGPLoadCallback';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);

	}
	/***
	* initialize the GPlus service
	* @params apikey string
	* @params clientid string
	* @params id string anchor of container element 
	*
	*/

	service.init = function (apikey, clientid, id) {

		params.GpApiKey = apikey;
		params.GpClientId = clientid;
		params.id = id;
		loadGPApi();
	};
	
	service.logout = function () {
		gapi.auth.signOut();
		location.reload();
	};

	service.login = function () {
		var myParams = {
			'clientid' : params.GpClientId,
			'cookiepolicy' : 'single_host_origin',
			'callback' : 'GPloginCallback',
			'approvalprompt':'force',
			'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
		};
		gapi.auth.signIn(myParams);
	};

	service.reset = function(){
		var element = document.getElementById('gplusSdk');
		element.parentNode.removeChild(element);
	};

	$window.GPloginCallback = function (result) {
		if(result['status']['signed_in']) {
			var request = gapi.client.plus.people.get(
			{
				'userId': 'me'
			});
			request.execute(function (resp)
			{
				var email = '';
				if(resp['emails'])
				{
					for(i = 0; i < resp['emails'].length; i++)
					{
						if(resp['emails'][i]['type'] == 'account')
						{
							email = resp['emails'][i]['value'];
						}
					}
				}

				var str = "Name:" + resp['displayName'] + "<br>";
				str += "Image:" + resp['image']['url'] + "<br>";
				str += "<img src='" + resp['image']['url'] + "' /><br>";

				str += "URL:" + resp['url'] + "<br>";
				str += "Email:" + email + "<br>";
				$rootScope.Gpstatus = str;
			});

		}

	};

	return service ;
});