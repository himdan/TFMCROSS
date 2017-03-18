"use strict";
app.directive('tfMaps', function(Gmaps, $timeout, Dialog) {
    return {
        restrict: 'A',
        scope: {
            map: "="
        },
        controller: function($scope,$timeout, Gmaps, Dialog) {

            $scope.$on('GeoLocalization',function(event,data){

                $timeout(function() {
                    $scope.map = Gmaps.createMap("google-maps");
                    if(data.config.markers) {

                        angular.forEach(data.config.markers,function(current, idx) {

                            if(current.is_centered) Gmaps.setCenter(current);
                            Gmaps.addMarker(current);

                        });



                    }}, 500);

                





            });
            $scope.$on('GeoLocalizationFaillure', function(event, err) {

                switch(err.code) {
                    case 3:
                    Dialog.alert("Info", "si il vous plais activez votre GPS", "OK");
                    break;
                    case 2:
                    Dialog.alert("Info", "Locatlisation Reseau n'est pas Active", "OK");
                    break;
                    default :
                    Dialog.alert("Info", err.message, "OK");
                    break;
                }

            });
            $scope.$on('$destroy', function(event, data){
                console.log(event);
            });
            $scope.$on('DestroyMap', function(){
                console.log(Gmaps.isLoaded());
                Gmaps.reset();
            });
        }
    };
});
