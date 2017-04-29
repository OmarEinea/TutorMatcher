angular.module('UOSTutors', ['ngMaterial'])

.controller('toolbar', function($scope) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
});