app.controller('MenuController', ['$scope', '$mdDialog', '$mdSidenav', '$animate', '$mdToast', function($scope, $mdDialog, $mdSidenav, $animate, $mdToast) {
  $scope.toggleMenu = function() {
    $mdSidenav('left').toggle();
  };
}]);