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
      controller: 'MainCtrl',
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

app.factory('gifts', ['$http', function($http){
  var o = {
    gifts: []
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
  o.create = function(gift){
    return $http.post('/gifts', gift).success(function(data){
      o.gifts.push(data);
    });
  }
  o.remove = function(gift){
    console.log(gift);
    $http.delete('/gifts/'+gift._id);
  }
  return o;
}])

.controller('MainCtrl', ['$scope', 'gifts',
  function($scope, gifts){
    $scope.gifts = gifts.gifts;
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


      $scope.create = function(isValid) {
        if (isValid) {
        //base setting for affiliate
        var affiliate = 'givetu2-20';
        if(this.affiliate){
          affiliate = this.affiliate;
        }
        var gift = $scope.newgift;
          /*
          title: $scope.title,
          img_src: $scope.img_src,
          description: $scope.description,
          amazonid: $scope.amazonid,
          source_url: $scope.source_url,
          price: $scope.price,
          gender: $scope.gender,
          relationship: $scope.relationship,
          nsfw: $scope.nsfw,
          booze: $scope.booze,
          geek: $scope.geek,
          joke: $scope.joke
          */
        console.log(gift);
        gifts.create(gift);
      } else {
        console.log('gift not valid');
      }
    };
    $scope.findOne = function(){
      console.log($stateParams.id);
      if($stateParams.id){
        gifts.findOne($stateParams.id);
        $scope.gift = gifts.gifts;
        console.log(gifts);
      }
    }

    $scope.remove = function(gift){

        gifts.remove(gift);

    }


}]);



