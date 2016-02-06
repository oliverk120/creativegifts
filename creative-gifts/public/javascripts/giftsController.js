angular.module('creativegifts').controller('GiftsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'gifts',
  function($scope, $state, $stateParams, gifts){
      $scope.gifts = gifts.gifts;
      //$scope.gift = gifts.gifts[$stateParams.id];

      var query = {nsfw: true};
      gifts.filterGifts(query);

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


}]);



