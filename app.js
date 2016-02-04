var app = angular.module('creativegifts', [ 'ui.bootstrap', 'ui.router'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    /*
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
*/
    .state('gifts', {
      url: '/gifts',
      templateUrl: '/gifts.html',
      controller: 'GiftsCtrl'
    });

  $urlRouterProvider.otherwise('gifts');
}])

.controller('MainCtrl', ['$scope',
function($scope){
      //all query items added in view other than default min/max price
    $scope.query = {};
    $scope.query.minprice = 0;
    $scope.query.maxprice = 400;   
}])

.controller('GiftsCtrl', ['$scope',
function($scope){
      //all query items added in view other than default min/max price
    $scope.gift = {name:'first gift'};
}]);



