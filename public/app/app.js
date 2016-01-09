angular.module('app',['reverseShouts','storyService','storyController','appRoutes','mainCtrl','authenticationService', 'userCtrl', 'userService'])


.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})



