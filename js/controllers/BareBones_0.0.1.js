angular.module('Node-Social').controller('BareBones_0.0.1', ['$scope','$http', function ($scope, $http) {

	this.loadBareBones = function () {
		var linkToService = 'http://localhost:775';

		$http.get(linkToService+'?barebones')
		.success(function (data, status, headers, config) {


			$scope.mainTitle = data.title;
			$scope.appVersion = data.version;
			//$scope.tasks = data.tasks;
			$scope.description = data.description;

		}).error(function (data, status, headers, config) {
			console.log(data, status);
		});

		$http.get(linkToService+'?tasks')
		.success(function (data, status, headers, config) {
			console.log(data);

			$scope.tasks = data;

		}).error(function (data, status, headers, config) {
			console.log(data, status);
		});
	};

	this.loadBareBones();
}]);