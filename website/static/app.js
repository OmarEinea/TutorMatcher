angular.module('UOSTutors', ['ngMaterial', 'materialCalendar', 'mdCollectionPagination'])

.config(function($mdIconProvider, $locationProvider){
    $locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
    $mdIconProvider.icon("md-tabs-arrow", "/static/tabs-arrow-icon.svg");
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
})

.controller("calendar", function($scope, $filter) {
    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    //$scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

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
    $scope.shownCourses = $scope.allCourses.slice(0, 8);

    $scope.catClass = "absolute";
    $window.onscroll = function() {
        var catClass = document.body.scrollTop > 64 ? "fixed" : "absolute";
        if($scope.catClass != catClass) {
            $scope.catClass = catClass;
            $scope.$apply();
        }
    };
});