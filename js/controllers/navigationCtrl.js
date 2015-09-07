angular.module('Node-Social').controller('navigationCtrl', ['$scope','$location', function ($scope, $location) {
	$scope.navTitle = 'Node Social';
	//change active state when clicked
	
	$scope.isActive = function (path) {
		console.log('this is the path: ', path);
		if ($location.path().substr(0, path.length) === path) {
			return 'active';
		} else {
			return '';
		}
	};
	
}]);