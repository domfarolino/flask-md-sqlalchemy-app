app.controller('MessagesController', function($scope, $http, $timeout, $mdToast, $animate) {
    // Some initializers
    $scope.messages = $scope.messages || [];          // Local messages array will be populated filled with message objects from a successfull response of the api
    $scope.selectedAll = $scope.selectedAll || false; // Boolean tracking select/unselect all checkbox's state
    $scope.selected = $scope.selected || [];          // Array to hold id's of messages that are selected
    
    $scope.getData = function(){
        $http.get('/messages').
            then(function(response) {
                if(angular.toJson(response.data.messages) != angular.toJson($scope.messages)) {
                    $scope.messages = response.data.messages;
                    $scope.clearAllSelected();
                    $scope.confirmRestOperation(response);
                }
            }, function(response) {
                $scope.messages = [];
                $scope.confirmRestOperation(response);
            });
    };

    // Function to replicate setInterval using $timeout service.
    $scope.intervalFunction = function(){
        $timeout(function() {
            if(!$scope.autoUpdateCheck){
                $scope.getData();
            } else {
                $scope.getData();
                $scope.intervalFunction();
            }
        }, 1000);
    };

    $scope.addMessage = function (){
        var data = {"author": $scope.msgauthor, "message": $scope.msgmsg};

        $http.post('/addMessage', data, {'Content-Type': 'application/json'}).
            then(function(response) {
                $scope.confirmRestOperation(response);
            }, function(response) {
                $scope.confirmRestOperation(response);
            });
    };

    $scope.deleteMessages = function() {
        var data = {id: $scope.selected};
        
        $http.post('/deleteMessage', data, {'Content-Type': 'application/json'}).
            then(function(response) {
                $scope.confirmRestOperation(response);
                $scope.clearAllSelected();
            }, function(response) {
                $scope.confirmRestOperation(response);
            });

    };

    $scope.toggleAll = function () {
        if ($scope.selectedAll == true) {
            $scope.clearAllSelected();
        } else if($scope.selectedAll == false) {
            $scope.populateAllSelected();
        }
    };

    $scope.clearAllSelected = function() {
        $scope.selected = [];
        $scope.selectedAll = false;
    };

    $scope.populateAllSelected = function() {
        $scope.clearAllSelected();
        for (var i = $scope.messages.length - 1; i >= 0; i--) {
            $scope.selected.push($scope.messages[i].id)
        };
        if($scope.messages.length == $scope.selected.length) $scope.selectedAll = true; // quick redundancy check before assigning selectedAll to true
    };

    $scope.returnAllSelected = function() {
        return $scope.selectedAll == true;
    };

    $scope.returnMessagesEmpty = function() {
        return $scope.messages.length == 0;
    }

    $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }

        if($scope.messages.length == $scope.selected.length) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
    };

    $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.confirmRestOperation = function(response) {
        $scope.showActionToast(response.statusText);
    };

    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };

    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    $scope.showActionToast = function(data) {
        var toast = $mdToast.simple()
        .content(data)
        .action('OK')
        .highlightAction(false)
        .position($scope.getToastPosition());
        $mdToast.show(toast).then(function(response) {
            alert(response);
            if(response == 'OK') {
                alert('You clicked \'OK\'.');
            }
        });
    };

});