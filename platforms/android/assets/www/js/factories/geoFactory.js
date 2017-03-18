app.factory('GeoFactory', function($ionicPlatform,$q,$window) {

	var watchid;
	var geolocationOptions = {timeout: 3000, enableHighAccuracy:false };
	var q = $q.defer();
	var loc = {address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:true,type:[]};
	var geolocationSuccess = function(position){
		loc.address = "current Position";
		loc.latitude = position.coords.latitude;
		loc.longitude = position.coords.longitude;
		loc.icon.url ='img/mapP.png';
		loc.icon.width = 32;
		loc.icon.height= 32;
		loc.title ="my postion";
		loc.link = "https://www.facebook.com";
		loc.type = ["Person"];
		loc.is_centered = true;
		q.resolve(loc);
	};
	var geolocationError = function(error){
		q.reject(error);
	};
	var geolocationWatchSuccess = function(position){
		loc.address = "current Position";
		loc.latitude = position.coords.latitude;
		loc.longitude = position.coords.longitude;
		loc.icon.url ='img/mapP.png';
		loc.icon.width = 32;
		loc.icon.height= 32;
		loc.title ="my postion";
		loc.link = "https://www.facebook.com";
		loc.type = ["Person"]
		loc.is_centered = true;
		q.resolve(loc);
	};
	var geolocationWatchError = function(error){
		q.reject(error);
	};




	var factory =  {

		getPosition: function() {
			geolocationOptions.enableHighAccuracy = false;
			try{
				navigator.geolocation.getCurrentPosition(geolocationSuccess,
					geolocationError,
					geolocationOptions);
			} catch(err){
				q.reject(err);
			}
			
			return q.promise;
		},
		watchPosition:function(){

			geolocationOptions.enableHighAccuracy = true;
			geolocationOptions.timeout = 100;
			try{
				geolocationOptions.enableHighAccuracy = true;
				watchid = navigator.geolocation.getCurrentPosition(geolocationWatchSuccess,
					geolocationWatchError,
					geolocationOptions);
			} catch(err) {
				q.reject(err);
			}


				return q.promise;
			},
			clearWatchPosition:function(){
				navigator.geolocation.clearWatch(watchid);
			},

		};
		return factory;
	});