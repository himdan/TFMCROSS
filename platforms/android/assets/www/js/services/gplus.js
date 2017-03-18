app.service('Gplus', function($window, $rootScope, $q){
	
	var service  = {};
	var accessToken;
	var UserData = null;
 	var googleapi = {
	    authorize: function(options) {
	            var deferred = $q.defer();

	            //Build the OAuth consent page URL
	            var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + param({
	                client_id: options.client_id,
	                redirect_uri: options.redirect_uri,
	                response_type: 'code',
	                scope: options.scope

	            });

	            //Open the OAuth consent page in the InAppBrowser
	            var authWindow = $window.open(authUrl, '_blank', 'location=no,toolbar=no');

	            //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
	            //which sets the authorization code in the browser's title. However, we can't
	            //access the title of the InAppBrowser.
	            //
	            //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
	            //authorization code will get set in the url. We can access the url in the
	            //loadstart and loadstop events. So if we bind the loadstart event, we can
	            //find the authorization code and close the InAppBrowser after the user
	            //has granted us access to their data.
	            authWindow.addEventListener('loadstart', function(e) {
	            	var url = e.originalEvent.url;
	                var code = /\?code=(.+)\/$/.exec(url);
	                var error = /\?error=(.+)$/.exec(url);
	                if (code || error) {
	                    //Always close the browser when match is found
	                    authWindow.close();
	                }

	                if (code) {
	                    //Exchange the authorization code for an access token
	                    $.post('https://accounts.google.com/o/oauth2/token', {
	                        code: code[1],
	                        client_id: options.client_id,
	                        client_secret: options.client_secret,
	                        redirect_uri: options.redirect_uri,
	                        grant_type: 'authorization_code'
	                    }).done(function(data) {
	                        deferred.resolve(data);
	                    }).fail(function(response) {
	                        deferred.reject(response.responseJSON);
	                    });
	                } else if (error) {
	                    //The user denied access to the app
	                    deferred.reject({
	                        error: error[1]
	                    });
	                }
	            });

	            return deferred.promise;
		}
};

service.callGoogle = function ()
    {

    //  alert('starting');
        googleapi.authorize({
            client_id: '1008359935758-pkob13j43dk3sjm45v6s5jtti8ftt93s.apps.googleusercontent.com',
            client_secret: '56:82:20:07:C3:3C:95:22:08:40:CF:EB:8A:4E:ED:49:2B:7E:54:45',
            redirect_uri: 'http://localhost/callback',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            }).then(function(data) {
                accessToken=data.access_token;
               // alert(accessToken);
                // $loginStatus.html('Access Token: ' + data.access_token);
                console.log(data.access_token);
				console.log(JSON.stringify(data));
                getDataProfile();


            	});

    }
    // This function gets data of user.
function getDataProfile() {
        var term=null;
      //  alert("getting user data="+accessToken);
        $.ajax({
               url:'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+accessToken,
               type:'GET',
               data:term,
               dataType:'json',
               error:function(jqXHR,text_status,strError){
               },
               success:function(data)
               {
               var item;

               console.log(JSON.stringify(data));
// Save the userprofile data in your localStorage.
               localStorage.gmailLogin="true";
               localStorage.gmailID=data.id;
               localStorage.gmailEmail=data.email;
               localStorage.gmailFirstName=data.given_name;
               localStorage.gmailLastName=data.family_name;
               localStorage.gmailProfilePicture=data.picture;
               localStorage.gmailGender=data.gender;
               }
               });
    disconnectUser();
}
function disconnectUser() {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token='+accessToken;

  // Perform an asynchronous GET request.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Do something now that user is disconnected
      // The response is always undefined.
      accessToken=null;
      console.log(JSON.stringify(nullResponse));
      console.log("-----signed out..!!----"+accessToken);
    },
    error: function(e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
    }
  });
}

var param = function(obj) {

  if ( ! angular.isObject( obj) ) { 
    return( ( obj== null ) ? "" : obj.toString() ); 
  }
  var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

  for(name in obj) {

    value = obj[name];
    if(value instanceof Array) {
      for(i in value) {

        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }

    } else if(value instanceof Object) {
      for(subName in value) {

        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }
    }
    else if(value !== undefined && value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }

  return query.length ? query.substr(0, query.length - 1) : query;
};

return service;
});