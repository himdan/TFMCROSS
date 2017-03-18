app.factory('CameraFactory',function($q){
	
	var q = $q.defer();
	
	 var onCameraSuccess = function(imageData) {
		
		 q.resolve(imageData);
	};

	var onCameraFail = function(message) {
		 q.reject(message);
	};
	return {
		getPicture: function(option){
			try {
				navigator.camera.getPicture(onCameraSuccess, onCameraFail, option);
			} catch(err){
            	q.reject(err);
			}
			return q.promise;

		}
	};
});