app.controller('etablissementDetailsCtrl', function($scope, $ionicSlideBoxDelegate) {

   $scope.etablissement = {};

   var etablissement = {
   	titre:'El Fan',
   	nom:'Pretty eat Machine',
   	addresse:'1024 bardo tunis',
   	image:'img/etab.JPG',
   	prix:20,
   	latitude:0,
   	longitude:0,
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
   	 $scope.etablissement = etablissement;
   	 $ionicSlideBoxDelegate.update();
   });
   $scope.loadContent = function() {

   };
});