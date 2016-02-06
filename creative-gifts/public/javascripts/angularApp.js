var app = angular.module('creativegifts', [ 'ui.bootstrap', 'ui.router'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'GiftsCtrl',
      resolve: {
        postPromise: ['gifts', function(gifts){
          return gifts.getAll();
        }]
      }
    })
    .state('create gift', {
      url: '/gifts/create',
      templateUrl: '/createGift.html',
      controller: 'GiftsCtrl'
    })
    .state('all gifts', {
      url: '/gifts',
      templateUrl: '/gifts.html',
      controller: 'GiftsCtrl'
    })
    .state('view gift', {
      url: '/gift/{id}',
      templateUrl: '/viewGift.html',
      controller: 'GiftsCtrl',
    });

    $urlRouterProvider.otherwise('home');
  }])

app.factory('gifts', ['$http', '$state', function($http, $state){
  var o = {
    gifts: [],
    filtered: []
  };
  o.getAll = function(){
    return $http.get('/gifts').success(function(data){
      angular.copy(data, o.gifts);
    })
  }
  o.findOne = function(id){
    return $http.get('/gifts/'+id).success(function(data){
      angular.copy(data, o.gifts);
    })
  }
  o.filterGifts = function(giftQuery){
      return $http.get('/gifts', {query: giftQuery}).success(function(data){
      angular.copy(data, o.filtered);
    })
  }
  o.create = function(gift){
    return $http.post('/gifts', gift).success(function(data){
      //add new gift to list of gifts
      o.gifts.push(data);
      //redirect to view page for new gift
      $state.go('view gift', {"id":data._id});
    });
  }
  o.remove = function(gift){
    $http.delete('/gifts/'+gift._id).success(function(data){
      console.log(data);
    });
  }
  return o;
}])

.controller('MainCtrl', ['$scope', 'gifts',
  function($scope, gifts){
      //all query items added in view other than default min/max price
      $scope.query = {};
      $scope.query.minprice = 0;
      $scope.query.maxprice = 400;   
    }]);



