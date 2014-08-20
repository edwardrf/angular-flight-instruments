'use strict';

angular.module('angularFlightInstrumentsApp')
  .controller('MainCtrl', function ($scope, $http, planeSocket) {
    $scope.plane = {
      pitch: 10,
      speed: 300,
      heading: 185,
      roll: 45,
      altitude: 498,
      verticalSpeed: 3
    }

    var delta = 5;
    var iflag = null;


    planeSocket.on('status', function(status) {
      // console.log('STATUS', status);
      $scope.$apply(function(){
        $scope.plane = status;
      });
    });

    $scope.updatePlane = function() {
      if($scope.plane.pitch > 50 || $scope.plane.pitch < -50) delta = -delta;
      $scope.plane.pitch += delta;
    }
  });
