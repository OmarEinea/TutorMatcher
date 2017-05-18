angular.module('UOSTutors', ['ngMaterial', 'ngRoute', 'ngStorage', 'materialCalendar', 'mdCollectionPagination'])

.config(function($mdIconProvider, $locationProvider, $routeProvider, $localStorageProvider){
    $mdIconProvider.icon("md-tabs-arrow", "UOSTutors/tabs-arrow-icon.svg");
    $locationProvider.html5Mode(true);
    $localStorageProvider.setKeyPrefix('');
    $routeProvider.when("/", {
        templateUrl: 'home.html'
    }).when("/courses.html", {
        templateUrl: 'courses.html',
        controller: 'courses'
    }).when("/tutors.html", {
        templateUrl: 'tutors.html'
    }).when("/tutor.html", {
        templateUrl: 'tutor.html',
        controller: 'tutor'
    }).when("/course.html", {
        templateUrl: 'course.html',
        controller: 'course'
    });
})

.directive('redirect', function($location) {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.$apply(function() {
                    $location.path(attrs.redirect);
                });
            });
        }
    }
})

.run(function($location) {
    if($location.path() == "/index.html")
        $location.path('/');
})

.controller('toolbar', function($scope, $mdDialog, $localStorage) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];

    $scope.cancel = $mdDialog.cancel;
    $scope.login = function() {
        $mdDialog.hide();
    };
    $scope.signup = function() {
        $mdDialog.hide();
    };
    $scope.showDialog = function(event) {
        $mdDialog.show({
            templateUrl: 'login-dialog',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        });
    };
    $scope.$ls = $localStorage.$default({
        items: []
    });
})

.controller("tutor", function($scope, $filter) {
    var randColor = function() {
        return ["green-500", "red-400"][Math.floor((Math.random()*2))];
    };
    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = new Date();
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.firstDayOfWeek = 6; // First day of the week, 0 for Sunday, 1 for Monday, etc.

    $scope.tooltips = true;
    $scope.status = ["Busy Day", "Free Day", "Day Off"];
    $scope.setDayContent = function(date) {
        return '<div layout="column">' +
                    '<div layout="row">' +
                        '<md-button class="md-raised" style="top: 8; left: 8" md-colors="{background: \'' + randColor() + '\'}">2</md-button>' +
                        '<md-button class="md-raised" style="top: 8; right: 8" md-colors="{background: \'' + randColor() + '\'}">3</md-button>' +
                    '</div>' +
                    '<div layout="row">' +
                        '<md-button class="md-raised" style="bottom: 8; left: 8" md-colors="{background: \'' + randColor() + '\'}">5</md-button>' +
                        '<md-button class="md-raised" style="bottom: 8; right: 8" md-colors="{background: \'' + randColor() + '\'}">6</md-button>' +
                    '</div>' +
                '</div>';
    };
})

.controller('courses', function($scope, $window) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];

    $scope.allCourses = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    $scope.shownCourses = null;

    $scope.catClass = "absolute";
    $window.onscroll = function() {
        var catClass = document.body.scrollTop > 64 ? "fixed" : "absolute";
        if($scope.catClass != catClass) {
            $scope.catClass = catClass;
            $scope.$apply();
        }
    };
})

.controller('course', function($scope, $localStorage) {
    $scope.tutors = new Array(8);
    $scope.date = new Date();
    $scope.addToCart = function(session) {
        $localStorage.items.push(session);
    };
});