angular.module('Node-Social').controller('signupCtrl', ['$scope','$http', function ($scope, $http) {
    $scope.register = function () {
        var registerObj = {
            'firstName': $scope.fName,
            'lastName': $scope.lName,
            'email': $scope.email,
            'password': $scope.password
        }

        if ($scope.checkToAgree) {
            registerUser(registerObj);
        } else {
            $scope.errorMsg = 'You must check to agree the terms.';
        }
    };

    function registerUser (regObj) {
        $http.post('/api/register', regObj).success(function (data, headers, config) {
            if (data.message) {
                $scope.successSignUp = data.message;
            }
            $scope.errorMsg = data.errorMsg;

        }).error(function (data, status, headers, config) {
            $scope.errorMsg = data.errorMsg;
        });
    };
}]);