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
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });
    $urlRouterProvider.otherwise('home');
  }]);

app.factory('auth', ['$http', '$window', function($http, $window){
 var auth = {};

 auth.saveToken = function (token){
  $window.localStorage['creativegifts-token'] = token;
};

auth.getToken = function (){
  return $window.localStorage['creativegifts-token'];
}

auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.username;
  }
};

auth.register = function(user){
  return $http.post('/register', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logIn = function(user){
  return $http.post('/login', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logOut = function(){
  $window.localStorage.removeItem('creativegifts-token');
};

return auth;
}])

app.factory('gifts', ['$http', '$state', 'auth', function($http, $state, auth){
  var o = {
    gifts: [],
    gift:{}
  };
  o.getAll = function(){
    return $http.get('/gifts').success(function(data){
      angular.copy(data, o.gifts);
    })
  }
  o.findOne = function(id){
    return $http.get('/gifts/'+id).success(function(data){
      angular.copy(data, o.gift);
    })
  }
  o.find = function(giftQuery){
    return $http.get('/gifts', {params: giftQuery}).success(function(data){
      angular.copy(data, o.gifts);
    })
  }
  o.create = function(gift){
    return $http.post('/gifts', gift, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      //add new gift to list of gifts
      o.gifts.push(data);
      //redirect to view page for new gift
      $state.go('view gift', {"id":data._id});
    });
  }
  o.remove = function(gift){
    $http.delete('/gifts/'+gift._id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      console.log(data);
    });
  }
  return o;
}]);

app.controller('AuthCtrl', [
  '$scope',
  '$state',
  'auth',
  function($scope, $state, auth){
    $scope.user = {};

    $scope.register = function(){
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    };

    $scope.logIn = function(){
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });
    };
  }])

app.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
  }]);

app.controller('MainCtrl', ['$scope', 'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
  }]);



