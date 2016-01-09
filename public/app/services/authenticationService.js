angular.module('authenticationService', [])
.factory('Auth', function($http, $q, AuthToken) {
        var authFactory = {};

        authFactory.login =  function(username, password) {
            console.log('login');
            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function (data) {
                    console.log(data);
                    AuthToken.setToken(data.token);
                    console.log('set token');
                    return data;
                })
        };
        authFactory.logout = function() {
            AuthToken.setToken();
        };

        authFactory.loggedIn = function() {
            if(AuthToken.getToken()) {
                return true;
            }
            else {
                return false;
            }
        };

        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get('/api/current')
            }
            else {
                return $q.reject({message:"User does not have a valid token"});
            }
        };
        return authFactory;

    })


.factory('AuthToken', function($window) {
    var authFactory = {};

    authFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    authFactory.setToken = function (token) {
        if (token) {
            console.log('auth factory set token');
            $window.localStorage.setItem('token', token);
        }
        else {
            console.log('here')
            $window.localStorage.removeItem('token');
        }

    };
        return authFactory;
})


.factory('AuthInterceptor', function($q, $location, AuthToken) {
        console.log('interceptors')

        var interceptorFactory = {};
        interceptorFactory.request = function (config) {
            console.log('goes here')
            var token = AuthToken.getToken();
            if (token) {
                console.log('exists')
                config.headers['x-access-token'] = token;
            }
            return config;
        };

        interceptorFactory.responseError = function (response) {
            //Redirects user to login page
            if (response.status == 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        }

        return interceptorFactory;
    });



