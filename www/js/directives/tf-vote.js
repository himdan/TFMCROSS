app.directive('tfVote', function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
		},
		link: function (scope, element, attr) {
			var votes = attr.votes;
			var voters = attr.voters;
			var html = '<font style="font-size: 10px;color: red;font-weight: bold;margin-top:-10px;float: right;">' ;
			var content =  function() {
				var ratio = votes/voters;
				var moyen = ratio * 10;
				var format = Math.floor(moyen);
				return format + '/10 (' + voters +' voteurs)'; 
			};
			var endtag = '</font>';
			element.html(html + content() + endtag);
		},
		controller: function(){
			
		}
	};
});