angular.module('sampleApp').controller('SampleCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/authContent', config)
        .success(function (data) {
            if (data.message == 'killToken') {
                killToken();
            } else {
                $scope.allowedContent = data.authContent;
            }
        }).error(function (data) {
            console.log(data);
        });

        $scope.logOut = function () {
            alert('logging out user');
            killToken();
        };
}]);