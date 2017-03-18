"use strict";
app.directive('tfList', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			etablissement: '='
		},
		templateUrl:'template/bookmark/list.html',
		link: function () {
			
			

		},
		controller: function(){
			
		}
	};
});