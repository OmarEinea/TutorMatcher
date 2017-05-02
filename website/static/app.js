angular.module('UOSTutors', ['ngMaterial'])

.config(function($interpolateProvider, $locationProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
    $locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
})

.run(function($rootScope, $window) {
    $rootScope.url = '/html/' + $window.location.pathname.split('/')[1];
    $rootScope.redirect = function(url) {
        $window.history.pushState(null, null, '/' + url);
        $rootScope.url = '/html/' + url;
    }
})

.controller('toolbar', function($scope) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
});