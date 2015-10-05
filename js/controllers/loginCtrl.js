angular.module('Node-Social').controller('loginCtrl', ['$scope','$http', function ($scope, $http) {

    checkIfUserIsLoggedIn();

    $scope.submit = function () {

        loginUser($scope.email, $scope.password);
    }

    function loginUser(email, pass) {
        var postObj = {
            email: email,
            password: pass
        };

        $http.post('/api/login', postObj).success(function (data, headers, config) {
            if (data.token) {
                storeToken(data.token);
                $scope.token = data.token;
                checkIfUserIsLoggedIn();
            }
            $scope.errorMsg = data.errorMsg;

        }).error(function (data, status, headers, config) {
            $scope.errorMsg = data.errorMsg;
        });
    };

}]);