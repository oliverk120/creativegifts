angular.module('creativegifts').controller('GiftsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'gifts',
  'auth',
  function($scope, $state, $stateParams, gifts, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.gifts = gifts.gifts;
    $scope.numberOfGifts = $scope.gifts.length;

    $scope.create = function(isValid) {
      if (isValid) {
        //base setting for affiliate
        var affiliate = 'givetu2-20';
        if(this.affiliate){
          affiliate = this.affiliate;
        }
        var gift = $scope.newgift;
        var test = gifts.create(gift);
      } else {
        console.log('gift not valid');
      }
    };

    $scope.showGift = function(){
      if($stateParams.id){
              //if a list of gifts is loaded, preload image and id of next gift
        if($scope.gifts.length > 1){
            for (var k = 0; k < $scope.gifts.length; k+=1) {
              if ($scope.gifts[k]._id === $stateParams.id) {
                //if the current id is in the list of gifts, load that into gift variable
                angular.copy($scope.gifts[k], $scope.gift);
                var j = k+1;
                $scope.currentGiftNumber = j;
                if($scope.gifts[j]){
                  $scope.next_id = $scope.gifts[j]._id;
                  $scope.next_image = $scope.gifts[j].img_src;
                  preload($scope.next_image);
                }
              } else {
                //if the current id is not in the list of gifts, then load it from database
                $scope.findOne();
              }
            }
        } else if ($scope.gifts.length == 1) {
          //if only one gift is loaded, load that into the scope
          angular.copy($scope.gifts, $scope.gift);
        } else {
          $scope.findOne();
        }
      }
      console.log($scope);
    }


    $scope.findOne = function(){
      if($stateParams.id){
        gifts.findOne($stateParams.id);
        $scope.gift = gifts.gift;
      }
    }

    $scope.remove = function(gift){
      gifts.remove(gift);
      console.log($scope.gifts);
      for (var i in $scope.gifts) {
        if ($scope.gifts[i] === gift) {
          $scope.gifts.splice(i, 1);
        }
      }
      $scope.gift = {};
      $state.go('home');
    }

    $scope.find = function(query){
      if(!query){
        query = {};
      }
      gifts.find(query).success(function(data){

        });
      //put all the id's of the gifts retrieved into an array
    }

function preload(src) 
  {
    var preloadedImage = new Image(); 
    preloadedImage.src = src;
  }





  }]);



