app.service('CameraService', function(CameraFactory, $q){
	var q = $q.defer();
	var service = {
		takePicture: function(){
			try {
				var options = {
					quality : 75,
					targetWidth: 200,
					targetHeight: 200,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: 1
				};

				CameraFactory.getPicture(options).then(function(imageData) {
					q.resolve(imageData);


				}, function(err) {
					q.reject(err);
				});
			} catch(err) {
				q.reject(err);
			}
			return q.promise;

			

		},
		getPictureFromGallery:function(){
			try{
				var options = {
					quality : 75,
					targetWidth: 200,
					targetHeight: 200,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: 0
				};
				CameraFactory.getPicture(options).then(function(imageData) {
					q.resolve(imageData);

					;
				}, function(err) {
					q.reject(err);
				});
			} catch(err){
				q.reject(err);
			}

			return q.promise;

		}
	};
	return service;
});