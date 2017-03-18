app.factory('UrlFactory', function($http, $q) {
	var factory = {};
	var domaine = 'http://192.168.1.6/app_dev.php';
	var initialize = function() {
		var req = {
			method: 'POST',
			url: domaine + '/mobileRecette/routesMobile',
			data: {},
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'Application/json',

			}
		};
		var q = $q.defer();
		$http(req).then(function(result) {
			if(result) {
				var routes = [];
				angular.forEach(result.data.routes, function(prop, idx) {
					var route = {name:'', path:'' , url:'', method:'', pattern:'', host:''};
					route.name = prop.name;
					route.path = prop.instance.path;
					route.url =  domaine + prop.instance.path;
					route.method = prop.instance.method;
					route.pattern = prop.instance.pathRegex;
					route.host = prop.instance.host;
					routes.push(route);
				});
				q.resolve(routes);
			} else {
				q.reject({'code':404, 'message':'faillure to retrieve routes'});
			}
			
		}, function(err) {
			q.reject(err);

		});
		return q.promise;
	};
	/***
	*@param url string alias for the remote url
	*@param urlCallback function callback
	*/
	factory.getRemote = function(name,urlCallback) {
		initialize().then(function(routes) {
			angular.forEach(routes, function(prop, idx){
				if(prop.name == name) {
					urlCallback(prop.url);
				}
			});
		}, function(err){
			console.log(err);

		});
	};
	//factory.getRemote('connect',callbackfunction());
	return factory;
});