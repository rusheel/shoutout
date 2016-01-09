angular.module('mainCtrl', [])
    .controller('MainController', function($rootScope, $location, Auth) {
        var vm = this;

        vm.loggedIn = Auth.loggedIn();

        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.loggedIn();

            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });

        });

        vm.doLogin = function() {
            vm.processing = true;

            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function(data) {
                    vm.processing = false;
                    Auth.getUser()
                        .then(function(data) {
                            vm.user = data;
                            console.log(data);
                        });
                    console.log('post do login')
                    if (data) {
                        //redirect to homepage
                        $location.path('/');
                    }
                    else
                        vm.error = data.message;
                })
                .faiure
        }

        vm.doLogout= function () {
            Auth.logout();
            //redirect user to home
            $location.path('/logout');
        }
    });
