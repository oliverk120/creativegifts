var app = angular.module('creativegifts', [ 'ui.bootstrap', 'ui.router'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    console.log($urlRouterProvider);
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('gifts', {
      url: '/gifts/{id}',
      templateUrl: '/gifts.html',
      controller: 'GiftsCtrl'
    });

    $urlRouterProvider.otherwise('home');
  }])

app.factory('gifts', [function(){
  var o = {
    gifts: []
  };
  return o;
}])

.controller('MainCtrl', ['$scope', 'gifts',
  function($scope, gifts){
    $scope.gifts = gifts.gifts;
    //fake gift info
  

    $scope.gifts.push({title: '$scope.title'},{title: '$scoasdfitle'},{title: '$scofweewwfetle'},{title: '$scowfefwewetle'});


      //all query items added in view other than default min/max price
      $scope.query = {};
      $scope.query.minprice = 0;
      $scope.query.maxprice = 400;   
    }])

.controller('GiftsCtrl', [
  '$scope',
  '$stateParams',
  'gifts',
  function($scope, $stateParams, gifts){
    
      //all query items added in view other than default min/max price
      $scope.gift = gifts.gifts[$stateParams.id];
      $scope.othergift = gifts;
    }]);



