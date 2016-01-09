angular.module('reverseShouts', [])

    .filter('reverse', function() {

        return function(items) {
            return items.slice().reverse();
        }

    });
