angular.module('Node-Social').config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'homeCtrl'
		})
		
		.when('/app', {
			templateUrl: 'pages/home.html',
			controller: 'homeCtrl'
		})
		
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutCtrl'
		});
		
		$locationProvider.html5Mode(true);
});