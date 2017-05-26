var fb = firebase.initializeApp({
    apiKey: "AIzaSyACRVxzZhfUMcQqrn3RX-p8cFgXk1fUdxw",
    authDomain: "uos-tutors.firebaseapp.com",
    databaseURL: "https://uos-tutors.firebaseio.com",
    projectId: "uos-tutors",
    storageBucket: "uos-tutors.appspot.com",
    messagingSenderId: "1028351008990"
});
fb.auth().signInWithEmailAndPassword("eineao@ymail.com", "testing");

angular.module('UOSTutors', ['ngMaterial', 'ngRoute', 'ngStorage', 'materialCalendar', 'firebase'])

.config(function($mdIconProvider, $locationProvider, $routeProvider, $localStorageProvider){
    $mdIconProvider.icon("md-tabs-arrow", "UOSTutors/tabs-arrow-icon.svg");
    $locationProvider.html5Mode(true);
    $localStorageProvider.setKeyPrefix('');
    $routeProvider.when("/", {
        templateUrl: 'home.html'
    }).when("/home.html", {
        templateUrl: 'home.html'
    }).when("/courses.html", {
        templateUrl: 'courses.html',
        controller: 'courses'
    }).when("/tutors.html", {
        templateUrl: 'tutors.html',
        controller: 'tutors'
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
                    $location.path(attrs.redirect.toLowerCase() + ".html");
                });
            });
        }
    }
})

.run(function($location) {
    if($location.hash()) {
        $location.path('/' + $location.hash());
        $location.hash('');
    } else if($location.path() == "/index.html")
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

.controller("tutors", function($scope, $localStorage, $firebaseObject, $location) {
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));
    $scope.lengthOf = function(array) {
        return Object.keys(array).length;
    };
    $scope.goToTutor = function(key) {
        $localStorage.key = key;
        $location.path('tutor.html');
    };
})

.controller("tutor", function($scope, $filter, $localStorage, $firebaseObject) {
    $scope.tutor = $firebaseObject(fb.database().ref('Users/' + $localStorage.key));
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

.controller('courses', function($scope, $window, $location, $firebaseObject, $localStorage) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
    
    $scope.shownCourses = null;
    $scope.allCourses = $firebaseObject(fb.database().ref('Courses'));
    $scope.goToCourse = function(cname) {
        $localStorage.cname = cname;
        $location.path('course.html');
    };
    $scope.lengthOf = function(array) {
        return Object.keys(array).length;
    };
    $scope.catClass = "absolute";
    $window.onscroll = function() {
        var catClass = document.body.scrollTop > 64 ? "fixed" : "absolute";
        if($scope.catClass != catClass) {
            $scope.catClass = catClass;
            $scope.$apply();
        }
    };
})

.controller('course', function($scope, $localStorage, $firebaseObject, $location) {
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));
    $scope.date = new Date();
    $scope.course = $firebaseObject(fb.database().ref('Courses/' + $localStorage.cname));
    $scope.addToCart = function(session) {
        $localStorage.items.push(session);
    };
    $scope.goToTutor = function(key) {
        $localStorage.key = key;
        $location.path('tutor.html');
    };
});