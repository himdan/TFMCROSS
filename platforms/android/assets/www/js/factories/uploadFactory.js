app.factory('UploadFactory', function($q, $cordovaFileTransfer){
	
	var q = $q.defer();
	var server = 'path/to/server/controller/action';
	var filePath = 'path/to/media';
	var options = {
		fileKey: "File",
		httpMethod: "POST", 
		params: {
			'alternative':'alternative name for media',
			'apikey':'AppKey'
		},         
		chunkedMode: false,
	};
	return {
		configure: function(serverPath, filePath, apiKey, alt){
			
			server = serverPath;
			filePath = filePath;
			options.params.alternative = alt;
			options.params.apikey = apikey;
		},
		upload:function(medium){

			

			$cordovaFileTransfer.upload(server, filePath, options)
			.then(function(result) {
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, function (progress) {
				q.notify(progress);
			});
			return q.promise;
		}};
	});