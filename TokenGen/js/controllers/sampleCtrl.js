angular.module('sampleApp').controller('SampleCtrl', ['$scope', '$http', function ($scope, $http) {
    // $scope.hello = 'Hello Chris';
    // $scope.message = 'This is the message that I have here right now';

    // $scope.clickedResult = 'Click to see';

    // $scope.awesomeMethod = function () {
    //     //do something
    //     var _el = this;
    //     var testNum = 4927;

    //     var equation = (13 * 379);

    //     $scope.clickedResult = ('YOU CLICKED! Results: ' + equation);
    // };
    checkIfUserIsLoggedIn();

    var config = {
        headers: {
            'token': localStorage.getItem('token')
        }
    };

    // $http.get('/api/authContent', config)
    //     .success(function (data) {
    //         $scope.authContent = data.authContent;
    //     }).error(function (data) {
    //         console.log(data);
    //     });


    $scope.submit = function () {

        loginUser($scope.email, $scope.password);
    }

    function loginUser(email, pass) {

        var postObj = {
            email: email,
            pass: pass
        };

        $http.post('/api/login', postObj).success(function (data, headers, config) {
            if (data.token) {
                storeToken(data.token);
                checkIfUserIsLoggedIn();
                $scope.token = data.token;
            }
            
            $scope.errorMsg = data.message;

        }).error(function (data, status, headers, config) {
            $scope.errorMsg = data;
        });
    };

    function storeToken (token) {
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
    };

    function checkIfUserIsLoggedIn () {
        if (localStorage.getItem('token')) {
            window.location = '../controlPanel.html';
        }
    };

}]);