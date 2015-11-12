angular.module('Node-Social').controller('controlPanelCtrl', ['$scope','$http', function ($scope, $http) {
    //$scope.navTitle = 'Node Social';
    $scope.email;
    //alert('loaded about');
    //$scope.authContent = 'This is authContent';
    $scope.tabbedItems = ['feed', 'profile', 'recents', 'messages'];

    $scope.contentTab = 'pages/tabbed/feed.html';

    $http.get('/api/getUserContent', config)
        .success(function (data) {
            if (data.message == false) {
                killToken();
            } else {
                $scope.email = data.email;
                console.log($scope.email);
            }
        }).error(function (data) {
            console.log(data);
        });

    $scope.getPhotoPath = function () {
        return '/uploadPhoto/'+$scope.email;
    }

    $scope.showTab = function (tabType) {
        $scope.deactivateListItems();
        var tabName = tabType;
        $scope.contentTab = 'pages/tabbed/' + tabType + '.html';
        $scope[tabName] = 'active';
    };

    $scope.deactivateListItems = function () {
        console.log($scope.tabbedItems.length);
        for (var t = 0; t <= ($scope.tabbedItems.length-1); t++) {
            $scope[$scope.tabbedItems[t]] = '';
        }
    };

}]);