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
    $mdIconProvider.icon("md-tabs-arrow", location.pathname + "/tabs-arrow-icon.svg");
    $locationProvider.hashPrefix('');
    $localStorageProvider.setKeyPrefix('');
    $routeProvider.when("/", {
        templateUrl: 'home.html'
    }).when("/Courses", {
        templateUrl: 'courses.html',
        controller: 'courses'
    }).when("/Tutors", {
        templateUrl: 'tutors.html',
        controller: 'tutors'
    }).when("/Tutor/:id", {
        templateUrl: 'tutor.html',
        controller: 'tutor'
    }).when("/Course/:id", {
        templateUrl: 'course.html',
        controller: 'course'
    }).when("/Purchase", {
        templateUrl: 'purchase.html',
        controller: 'purchase'
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

.run(function() {
    if(location.pathname == "/index.html")
        location.pathname = "/";
})

.controller('toolbar', function($scope, $mdDialog, $localStorage, $firebaseObject, $location) {
    $scope.courses = $firebaseObject(fb.database().ref('Courses'));
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));

    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
    $scope.$location = $location;
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
        items: {}
    });
    $scope.deleteSession = function(key) {
        delete $scope.$ls.items[key];
    };
    $scope.itemsInCart = function() {
        return Object.keys($scope.$ls.items).length;
    };
})

.controller("tutors", function($scope, $firebaseObject) {
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));
    $scope.lengthOf = function(array) {
        return Object.keys(array).length;
    };
})

.controller("tutor", function($scope, $filter, $routeParams, $firebaseObject) {
    $scope.tutor = $firebaseObject(fb.database().ref('Users/' + $routeParams.id));
    $scope.courses = $firebaseObject(fb.database().ref('Courses'));
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

.controller('courses', function($scope, $window, $firebaseObject) {
    $scope.subjects = ['Statistics', 'Accounting', 'Algebra', 'Finance', 'Chemistry',
                       'Calculus', 'Study Skills', 'Writing', 'Biology', 'Computer Science'];
    
    $scope.shownCourses = null;
    $scope.allCourses = $firebaseObject(fb.database().ref('Courses'));
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

.controller('course', function($scope, $localStorage, $firebaseObject, $routeParams) {
    $scope.course = $firebaseObject(fb.database().ref('Courses/' + $routeParams.id));
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));
    $scope.date = new Date();
    $scope.addToCart = function(timeSlot, tutorId) {
        $localStorage.items[$routeParams.id + tutorId + timeSlot] = {
            course: $routeParams.id,
            tutor: tutorId,
            time: timeSlot
        };
    };
})

.controller('purchase', function($scope, $localStorage, $firebaseObject, $location, $mdToast) {
    $scope.courses = $firebaseObject(fb.database().ref('Courses'));
    $scope.tutors = $firebaseObject(fb.database().ref('Users'));
    $scope.$ls = $localStorage;
    $scope.completeOrder = function() {
        $location.path("/");
        $mdToast.show(
            $mdToast.simple()
                .textContent('Your Order Is Completed!')
                .hideDelay(3000)
        );
        $scope.$ls.items = {};
    };
});