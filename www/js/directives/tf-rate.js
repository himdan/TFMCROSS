app.directive('tfRate' , function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
		},
		link: function (scope, element, attr) {
			var rate_on = '<i class="icon ion-ios-star" style="color: orange"></i>';
			var rate_off = '<i class="icon ion-ios-star" style="color: grey"></i>';
			var stars = '';

			for( var i = 1 ;i < 5; i++) {
				if(i <= attr.rate) {
					stars = stars + rate_on;
				} else {
					stars =  stars + rate_off;

				}
			}

			element.html(stars);
		},
		controller: function(){
			
		}
	};
});