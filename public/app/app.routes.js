angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/page/home.html'
            })
            .when('/login', {
                templateUrl: 'app/views/page/login.html'
            })
            .when('/signup', {
                templateUrl: 'app/views/page/signup.html'
            })

        $locationProvider.html5Mode(true);
    });




