// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

.controller ("ListCtrl", function($scope, $http){

  $scope.allData = {};
  $scope.gewuenschteAnzahl = 0;

  $scope.refresh = function () {

      let allData = $scope.allData;

      let vorhandeneAnzahl = allData.length ;
    if(vorhandeneAnzahl < $scope.gewuenschteAnzahl )
      {
        $scope.gewuenschteAnzahl = vorhandeneAnzahl;
      }

      var randomNumbers = [];
      while(randomNumbers.length < $scope.gewuenschteAnzahl) {
        var randomNum = Math.floor(Math.random() * (vorhandeneAnzahl));
        if (randomNumbers.indexOf(randomNum) == -1) {
          randomNumbers.push(randomNum);
        }
      }

      $scope.generierteGerichtsliste = [];
      for(number in randomNumbers)
      {
        let zufaelligesGericht = {};
        zufaelligesGericht.name = allData[randomNumbers[number]].name;
        zufaelligesGericht.id = allData[randomNumbers[number]].id;
        zufaelligesGericht.tag = berechneWochentag(number);

        $scope.generierteGerichtsliste.push(zufaelligesGericht)
      }
    }

  $http.get ("js/meineRezepte.json").then( function(data) {
    $scope.allData = data.data;
  })

});


function berechneWochentag(verschiebung){

  var weekday = new Array(7);
  weekday[0] =  "Sonntag";
  weekday[1] = "Montag";
  weekday[2] = "Dienstag";
  weekday[3] = "Mittwoch";
  weekday[4] = "Donnerstag";
  weekday[5] = "Freitag";
  weekday[6] = "Samstag";

  let curentDay =new Date().getDay();
  let day = (curentDay+1*verschiebung)%7;
  return weekday[day];
}
