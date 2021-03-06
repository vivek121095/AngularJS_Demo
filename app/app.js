var myNinjaApp = angular.module('myNinjaApp' , ['ngRoute','ngAnimate']);
myNinjaApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

  $locationProvider.html5Mode(true);

$routeProvider
  .when('/home',{
    templateUrl: '/angular/views/home.html',
    controller : 'NinjaController'
  })
  .when('/directory',{
    templateUrl: '/angular/views/directory.html',
    controller : 'NinjaController'
  })
  .when('/contact',{
    templateUrl: '/angular/views/contact.html',
  }).otherwise({
    redirectTo : '/home'
  });
}]);
myNinjaApp.directive('randomNinja',[function() {
  return {
    restrict: 'E',
    scope : {
      ninjas : '=',
      title : '='
    },
    templateUrl:'/angular/views/custom.html',
    transclude : true,
    controller:function($scope){
      $scope.random = Math.floor(Math.random()*3);
    }
  };
}]);
myNinjaApp.run(function() {


});
//saving dependeny in minification by using array
myNinjaApp.controller('NinjaController',['$scope','$http',function($scope,$http) {
  $scope.removeNinja = function(x) {
    var removedNinja = $scope.ninjas.indexOf(x);
    $scope.ninjas.splice(removedNinja,1);

  }

  $scope.addUser = function(n,a) {
    $scope.ninjas.push({
      name :n,
      age : a,
      aval : true
    });
    $scope.user = "";
    $scope.age = "";
  }

  $scope.removeAll = function(){
    $scope.ninjas = [];
  }

  $http.get('/angular/data/ninjas.json').then(function(data) {
    $scope.ninjas = data.data;
  },function(e) {
    console.log(e);
  });
}]);
