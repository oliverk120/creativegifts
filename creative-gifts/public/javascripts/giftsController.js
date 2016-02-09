angular.module('creativegifts').controller('GiftsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'gifts',
  function($scope, $state, $stateParams, gifts){
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
    $scope.findOne = function(){
      var current_id = $stateParams.id;
      if(current_id){
        gifts.findOne(current_id);
        $scope.gift = gifts.gift;
      }
      $scope.next_id = 0;
      $scope.next_image = false;
      
      if($scope.gifts.length > 1){
        console.log('gifts loaded');
          for (var k = 0; k < $scope.gifts.length; k+=1) {
            console.log($scope.gifts[k]._id);
            if ($scope.gifts[k]._id === current_id) {
        console.log('found id in list');
              var j = k+1;
              if($scope.gifts[j]){
                console.log('next gift exists');
                $scope.next_id = $scope.gifts[j]._id;
                $scope.next_image = $scope.gifts[j].img_src;
                preload($scope.next_image);
              }
            }
          }
      }
      console.log($scope);
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



