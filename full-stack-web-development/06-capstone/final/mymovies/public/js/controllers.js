app.factory('OmdbService', function($http){
  var OmdbService = {};
  var searchUrl = "https://www.omdbapi.com/?callback=JSON_CALLBACK&r=json&type=movie&s="

  OmdbService.search = function(title) {
    return $http.jsonp(searchUrl + title);
  }

  return OmdbService;
});

app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $searchlocation.url("/login");
      });
  }
  $scope.isActive = function (viewLocation) {
    console.log('path =', $location.path());
    return viewLocation === $location.path();
  };
});

app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/home");
      });
  }

  $scope.signup = function(user) {
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/home");
        });
    }
  }
});

app.controller("HomeCtrl", ["$location", "$scope", "$rootScope", "OmdbService", function($location, $scope, $rootScope, OmdbService) {
  $scope.result = {
    movies: []
  };
  $scope.search = function(movie) {
    var title = movie.title;
    if(typeof title != "undefined" && title.length > 0) {
      OmdbService.search(movie.title)
        .success(function(data){
          $scope.result.movies = data.Search;
          console.log('data =', data);
        });
    }
  }
}]);
