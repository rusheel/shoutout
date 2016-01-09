angular.module('storyController',['storyService'])

    .controller('StoryController', function(Story, socketio) {

        var vm = this;

        Story.getStory()
            .success(function(data) {
                vm.stories = data;
            });



        vm.createStory = function() {
            console.log('STORY DATA');
            console.log(vm.storyData)
            Story.create(vm.storyData)
                .success(function(data) {

                    vm.storyData = '';

                    vm.message = data.message;
                })
        };

    socketio.on('story', function(data) {
            vm.stories.push(data);

        })


    });


