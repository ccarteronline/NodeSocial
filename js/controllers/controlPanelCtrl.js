angular.module('Node-Social').controller('controlPanelCtrl', ['$scope','$http', function ($scope, $http) {
    //$scope.navTitle = 'Node Social';

    //alert('loaded about');
    //$scope.authContent = 'This is authContent';

    $http.get('/api/test-content', config)
        .success(function (data) {
            if (data.message == false) {
                killToken();
            } else {
                $scope.authContent = data.message;
            }
        }).error(function (data) {
            console.log(data);
        });
}]);