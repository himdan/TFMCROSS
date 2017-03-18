app.factory('LocationFactory', function($http, $q, UrlFactory){
	
	
	/**
	* Request configuration object
	* req object
	*	method string POST GET
	*	url string remote resouce of the webservice
	*	data string url encode form date attr_0=value_0&...&attr_p=value_p .. &attr_n=value_n
	*	headers object request header
	*/
	var req = {
		method: 'POST',
		url:'',
		data:'',

		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept':'Application/json',

		}
	};
	/**
	* Data returned from the webservice
	*config object
		markers  array of marker
			marker object
				address string Address of the location
				latitude float latitude of the location
				longitude float longitude of the location
				icon object the thumbnail displayed in map
					url string  url of the thumbnail
					width  int  width of thumbnail
					height int  height of the thumbnail
				title string title of the location
				link string  external website of the location authority
				is_centered bool      define if this location is the center of the map
				type Array  of type location
				information object
					image object
						height int height of the image
						width int width of the image
						url string url of the image
						alt string alternative if the image doesnt display
					rating int rating of the place by internaute
					description string discription or advert



	*/
	var config= {
		markers : [
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:false,type:[],information:{}},
		{address:'',latitude:0.000,longitude:0.000,icon:{url:'',width:32,height:32},title:'',link:'',is_centered:true,type:[],information:{}},
		]
	};
	/**
	* Represent location types Resatarant Cafe Patisserie 
	* could be retrieved from webService or just for test Purpose
	* array of location types

	*/
	var types = ['Restaurant','Cafe','Patisserie','Glacier'];
	var images = ['img/etab.JPG','img/resto.jpeg','img/resto.jpg'];

	return {
		getConfig: function(person){
			var q = $q.defer();
			UrlFactory.getRemote('etablissementMobile',function(url){
				
				var req = {
					method: 'POST',
					url:url,
					data: 'apiKey='+ person.apiKey +'&latitude=' + person.location.latitude +
						'&longitude=' + person.location.longitude,
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept':'Application/json',

					}
		    	};
				$http(req).then(function(response) {
		        	q.resolve(response.data);
				}, function(err) {
					q.reject(err);
				});
				
			});
			return q.promise;
		},
		getAll: function(){
			var q = $q.defer();
			UrlFactory.getRemote('etablissementMobile',function(url){
				
				var req = {
					method: 'POST',
					url:url,
					data: '',
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept':'Application/json',

					}
		    	};
				$http(req).then(function(response) {
		        	q.resolve(response.data);
				}, function(err) {
					q.reject(err);
				});
				
			});
			return q.promise;
		},
		search: function(term) {
			var q = $q.defer();
			UrlFactory.getRemote('searchMobile',function(url){
				
				var req = {
					method: 'POST',
					url:url,
					data: 'apiKey=' + '&term=' + term,
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept':'Application/json',

					}
		    	};
				$http(req).then(function(response) {
		        	q.resolve(response.data);
				}, function(err) {
					q.reject(err);
				});
				
			});
			return q.promise;

		},
		getMarker : function(){
			return config.markers.pop();  
		},
		getMarkers:function(){
			return config.makers;
		},
		setMarkers: function(markers){
			config.markers = markers;
		},
		addMarker:function(marker){
			if(marker.is_centered){
				angular.forEach(config.markers, function(current, idx){
					current.is_centered = false;
				});
			}
			config.markers.push(marker);

			return config.markers;
		},
		containMarker: function(marker){
			var isSame = false;	
			Angular.forEach(config.markers, function(current, idx){
				isSame= (current === marker)? true:false; 
				if(isSame){return idx;} 
				else {return false;}
			});
		},
		filterBy: function(markers, type_idx){
			var filter_markers = [];
			var contain_center_marker = false;
			var index = 0;
			angular.forEach(markers, function(current,idx) {
				var type_test = false;
				angular.forEach(current.type, function(type, type_index){
                     type_test = (type == types[type_idx] || type =='Person');
				});
				if(type_test){
					filter_markers.push(current);
					index = (markers.length)? markers.length - 1: 0;

				}
			});

			console.log(filter_markers);
			return filter_markers;
		},
		mockMarkers:function(){
			var mocklatlng = {latitude:36.8091426,longitude:10.091801};
			var epslon = 0.1;
			var offset = (config.markers.length)? config.markers.length -1 : 0;
			
			angular.forEach(config.markers, function(current,idx){
				current.address = 'Mock Address:' + idx;
				current.latitude = mocklatlng.latitude + epslon * Math.random();
				current.longitude = mocklatlng.longitude + epslon * Math.random();
				current.type = types[Math.floor(Math.random() * 4)];
				if(offset == idx ){ 
					current.icon = {
						url:'img/mapP.png',
						width:32,
						height:32
					};
					current.type = ["Person"];
				}
				else {
					current.icon = {
						url:'img/mapM.png',
						width:32,
						height:32
					};
				}
				current.title = 'Mock title:' + idx;
				current.link = 'http://www.google.com';
				if(offset == idx ) current.is_centered = true;
			});
			return config.markers;
		},
		mockOnlyMarkers:function(){
			var mocklatlng = {latitude:36.8091426,longitude:10.091801};
			var epslon = 0.1;
			var offset = (config.markers.length)? config.markers.length -1 : 0;
			
			angular.forEach(config.markers, function(current,idx){
				current.address = 'Mock Address:' + idx;
				current.latitude = mocklatlng.latitude + epslon * Math.random();
				current.longitude = mocklatlng.longitude + epslon * Math.random(); 
				current.type = [];
				current.type.push(types[Math.floor(Math.random() * 4)]);
				current.type.push(types[Math.floor(Math.random() * 4)]);
				if(offset == idx ){ 
					current.icon = {
						url:'img/mapM.png',
						width:32,
						height:32
					};
					current.type = ["Person"];
				}
				else {
					current.icon = {
						url:'img/mapM.png',
						width:32,
						height:32
					};
				}
				current.title = 'Mock title:' + idx;
				current.link = 'http://www.google.com';
				current.information = {
					image:{url:images[Math.floor(Math.random() * 2)],height:100,width:120,alt:'mocks_' + idx},
					description:'Lorem ipsum ............<br/>........<br/>'
				};
				if(offset == idx ) current.is_centered = true;
			});
			return config.markers;
		}
	} ;
});