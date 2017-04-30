angular.module('UOSTutors', ['ngMaterial'])

.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
})

.controller('toolbar', function($scope) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
})

.controller('pageLoad', function($scope) {
    $scope.url = '/html/' + window.location.pathname.split('/')[1];
});