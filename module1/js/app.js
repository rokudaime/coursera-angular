(function() {
  'use strict';
  angular.module("LunchCheck", [])
  .controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.foodItems = "";
    $scope.message = "";
    $scope.calculateIfTooMuch = function () {
      if ($scope.foodItems) {
        var arr = $scope.foodItems.split(",");
        var len = arr.length;
        console.log(len);
        if (len <= 3) {
          $scope.message = "Enjoy!";
            $scope.messageStatus = "success";
        } else {
          $scope.message = "Too much!";
          $scope.messageStatus = "success";
        }
      } else {
        $scope.message = "Please enter data first";
        $scope.messageStatus = "error";
      }

      $scope.updateStatus = function() {
        $scope.messageStatus = "";
      }


    }

  };
})() ;
