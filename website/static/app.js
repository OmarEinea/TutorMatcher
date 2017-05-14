angular.module('UOSTutors', ['ngMaterial', 'ngRoute', 'materialCalendar', 'mdCollectionPagination'])

.config(function($mdIconProvider, $locationProvider, $routeProvider){
    $mdIconProvider.icon("md-tabs-arrow", "/static/tabs-arrow-icon.svg");
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
        templateUrl: '/html/index'
    }).when("/Courses", {
        templateUrl: '/html/courses'
    }).when("/Tutors", {
        templateUrl: '/html/tutors'
    }).when("/Tutor", {
        templateUrl: '/html/tutor'
    }).when("/Course", {
        templateUrl: '/html/course'
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

.controller('toolbar', function($scope) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
})

.controller("calendar", function($scope, $filter) {
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
        var index = Math.floor(Math.random() * 3);
        return "<h3 layout='column' layout-align='center center' md-colors=\"::{color: '" +
            (index == 0 ? "red" : (index == 1 ? "green" : "grey")) +
            "-500'}\">" + $scope.status[index] + "</h3>";
    };
})

.controller('courses', function($scope, $window) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];

    $scope.allCourses = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    $scope.shownCourses = null;

    $scope.catClass = "absolute";
    $window.onscroll = function() {
        var catClass = document.body.scrollTop > 64 ? "fixed" : "absolute";
        if($scope.catClass != catClass) {
            $scope.catClass = catClass;
            $scope.$apply();
        }
    };
});