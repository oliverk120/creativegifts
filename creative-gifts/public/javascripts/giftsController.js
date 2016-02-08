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
      if($stateParams.id){
        gifts.findOne($stateParams.id);
        $scope.gift = gifts.gifts;
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
        //every time find is run, gift list is reset
        $scope.giftIdList = [];
          for (var i = data.length - 1; i >= 0; i--) {
            $scope.giftIdList.push(data[i]._id);
          };
        });
      //put all the id's of the gifts retrieved into an array
    }
  }]);



