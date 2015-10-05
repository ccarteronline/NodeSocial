angular.module('Node-Social').controller('navigationCtrl', ['$scope', function ($scope, $location) {
	//orderNavItems();
	$scope.navTitle = 'Node Social';

	if (displayAuthUserNav()) {
		$scope.loginState = 'Logout';

	} else {
		$scope.loginState = 'Login';
		$scope.signUp = 'Sign-Up';
	}

	$scope.loginOrLogout = function () {
		if ($scope.loginState == 'Login') {
			window.location = '/login';
		} else {
			// Log out user
			killToken();
		}
	};
	//change active state when clicked

	// $scope.isActive = function (path) {
	// 	console.log('this is the path: ', path);
	// 	if ($location.path().substr(0, path.length) === path) {
	// 		return 'active';
	// 	} else {
	// 		return '';
	// 	}
	// };

}]);