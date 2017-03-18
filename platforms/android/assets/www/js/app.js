// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    
    
      
  });
    
    
})
.config(function($stateProvider, $urlRouterProvider){

    

    $stateProvider.state("login", {
        url:"/login",
        templateUrl:"template/login.html"
    });

    $stateProvider.state("register", {
        url:"/register",
        templateUrl:"template/register.html"
    });
    
    $stateProvider.state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'template/menu.html'
    });
    
    $stateProvider.state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu21': {
          templateUrl: 'template/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

    $stateProvider.state('menu.modifProfile', {
      url: '/modifProfile',
      views: {
        'side-menu21': {
          templateUrl: 'template/modifProfile.html'
        }
      }
    });

    $stateProvider.state('menu.coordonne', {
      url: '/coordonne',
      views: {
        'side-menu21': {
          templateUrl: 'template/coordonne.html',
          controller:'ProfileCtrl'
        }
      }
    });

    $stateProvider.state('menu.modifPassword', {
      url: '/modifPassword',
      views: {
        'side-menu21': {
          templateUrl: 'template/modifPassword.html',
          controller:'ProfileCtrl'
        }
      }
    });

    $stateProvider.state('menu.contact', {
      url: '/contact',
      views: {
        'side-menu21': {
          templateUrl: 'template/contact.html'
        }
      }
    });

    $stateProvider.state('menu.partage', {
      url: '/partage',
      views: {
        'side-menu21': {
          templateUrl: 'template/partage.html'
        }
      }
    });

     $stateProvider.state('menu.restaurant', {
      url: '/restaurant',
      views: {
        'side-menu21': {
          templateUrl: 'template/restaurant.html'
        }
      }
    });

     $stateProvider.state('menu.restaurantMap', {
      url: '/restaurantMap',
      views: {
        'side-menu21': {
          templateUrl: 'template/restaurantMap.html'
        }
      }
    });

      $stateProvider.state('menu.etablissement', {
      url: '/etablissement/:etabId',
      views: {
        'side-menu21': {
          templateUrl: 'template/etablissement.html',
          controller:'etablissementDetailsCtrl'
        }
      }
    });

    $stateProvider.state('menu.geo', {
      url: '/geo',
      views: {
        'side-menu21': {
          templateUrl: 'template/geo.html'
        }
      }
    });
    $stateProvider.state('menu.notification', {
      url: '/notification',
      views: {
        'side-menu21': {
          templateUrl: 'template/notification.html'
        }
      }
    });
    $stateProvider.state('menu.publication', {
      url: '/publication',
      views: {
        'side-menu21': {
          templateUrl: 'template/publication.html'
        }
      }
    });
    $stateProvider.state('menu.meetingPlace', {
      url: '/meetingPlace',
      views: {
        'side-menu21': {
          templateUrl: 'template/meetingPlace.html'
        }
      }
    });
    $stateProvider.state('menu.event', {
      url: '/event',
      views: {
        'side-menu21': {
          templateUrl: 'template/event.html'
        }
      }
    });
    $stateProvider.state('menu.privacy', {
      url: '/privacy',
      views: {
        'side-menu21': {
          templateUrl: 'template/privacy.html'
        }
      }
    });
    $stateProvider.state('menu.myfriends', {
      url: '/myfriends',
      views: {
        'side-menu21': {
          templateUrl: 'template/myfriends.html'
        }
      }
    });
    
    $stateProvider.state('menu.bookmark', {
      url: '/bookmark',
      views: {
        'side-menu21': {
          templateUrl: 'template/bookmark.html',
          controller: 'bookmarkCtrl'
        }
      }
    });
    
    $stateProvider.state('menu.faq', {
      url: '/faq',
      views: {
        'side-menu21': {
          templateUrl: 'template/faq.html'
        }
      }
    });
    
    $stateProvider.state('menu.config', {
      url: '/config',
      views: {
        'side-menu21': {
          templateUrl: 'template/config.html'
        }
      }
    });

     $stateProvider.state('menu.compte', {
      url: '/compte',
      views: {
        'side-menu21': {
          templateUrl: 'template/compte.html'
        }
      }
    });
    
    
    $stateProvider.state('menu.placeDescription', {
      url: '/placeDescription',
      views: {
        'side-menu21': {
          templateUrl: 'template/placeDescription.html'
        }
      }
    });
    
    $stateProvider.state('menu.eventDescription', {
      url: '/eventDescription',
      views: {
        'side-menu21': {
          templateUrl: 'template/eventDescription.html'
        }
      }
    });
    
    $stateProvider.state('menu.memberProfile', {
      url: '/memberProfile',
      views: {
        'side-menu21': {
          templateUrl: 'template/memberProfile.html'
        }
      }
    });
    
   

    $stateProvider.state('menu.home', {
      url: '/home',
      views: {
        'side-menu21': {
          templateUrl: 'template/home.html',
          controller:'HomeCtrl'
        }
      }
    });

    $stateProvider.state('menu.filtre', {
      url: '/filtre',
      views: {
        'side-menu21': {
          templateUrl: 'template/filtre.html'
        }
      }
    });
    
    $urlRouterProvider.otherwise("login");
});
