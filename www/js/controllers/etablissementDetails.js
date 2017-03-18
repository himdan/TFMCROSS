app.controller('etablissementDetailsCtrl', function($scope, $ionicSlideBoxDelegate, $stateParams, LocationFactory) {

   //$scope.etablissement = {};
   var upload_target = 'http://192.168.1.6/album/';
   $scope.is_loading = true;
   $scope.etablissement = {};

   var etablissement = {
   	titre:'El Fan',
   	nom:'Pretty eat Machine',
   	addresse:'1024 bardo tunis',
   	image:'img/etab.JPG',
   	prix:20,
   	latitude: 0,
   	longitude: 0,
   	description:'Lorem Ipsum ...........',
   	specialite:'cuisine tunisienne',
   	galleries:[{
   		collection:[
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		]},
   		{collection:[
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		]},
   		{collection:[
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		{src:'img/etab.JPG'},
   		]}]
   };
   $scope.$on('$ionicView.enter', function() {
   	 
   	 $scope.is_loading = false;
       $scope.loadContent();
       
   });
   $scope.loadContent = function() {
      LocationFactory.get($stateParams.etabId).then(function(response){
         console.log(response.data.long_etablissement);
         etablissement.titre = response.data.nom_etablissement;
         etablissement.galleries = buildGallerie(response.data.album);
         etablissement.prix = response.data.budget_etablissement;
         etablissement.latitude = response.data.lat_etablissement;
         etablissement.longitude = response.data.long_etablissement;
         $scope.etablissement = etablissement;
         $ionicSlideBoxDelegate.update();

       }, function(err){
         console.log(err);
       });
   };

   function format(object){

   }
   function buildAddress(object){

   }
   function buildGallerie(object){
      var galleries = [];
      var collection = [];

      if(typeof(object) == "object" && object.length > 0 ) {
         var img = {src: upload_target + (object[0]).path};
         collection.push(img);
         for (var i = 1; i < object.length; i++) {
            if (i%5) {
               img = {src: upload_target + (object[i]).path};
               collection.push(img);
               if(i == object.length - 1) galleries.push( {collection:collection});

            } else {
               galleries.push({collection:collection});
               collection = [];
               img = {src: upload_target + (object[i]).path};
               collection.push(img);
               if(i == object.length - 1) galleries.push( {collection:collection});
            }
         }
         
      }
      console.log(galleries);
      return galleries;
   }

});