angular.module('Node-Social').config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'homeCtrl'
		})
		
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutCtrl'
		})

		.when('/login', {
			templateUrl: 'pages/login.html',
			controller: 'loginCtrl'
		})

		.when('/signup', {
			templateUrl: 'pages/signup.html',
			controller: 'signupCtrl'
		});
		
		$locationProvider.html5Mode(true);
});