app.factory('OmdbService', function($http){
  var OmdbService = {};
  var searchUrl = "https://www.omdbapi.com/?callback=JSON_CALLBACK&r=json&type=movie&s="
  var idUrl = "https://www.omdbapi.com/?callback=JSON_CALLBACK&r=json&type=movie&plot=short&i="

  OmdbService.search = function(title) {
    return $http.jsonp(searchUrl + title);
  }

  OmdbService.getById = function(id) {
    return $http.jsonp(idUrl + id);
  }

  return OmdbService;
});

app.factory('UtilsService', function($http, $rootScope){
  var UtilsService = {};
  var searchUrl = "https://www.omdbapi.com/?callback=JSON_CALLBACK&r=json&type=movie&s="
  var idUrl = "https://www.omdbapi.com/?callback=JSON_CALLBACK&r=json&type=movie&plot=short&i="

  UtilsService.search = function(title) {
    return $http.jsonp(searchUrl + title);
  }

  UtilsService.getImg = function(movie) {
    if(movie.Poster == "N/A") {
      return "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-image-missing-icon.png";
    } else {
      return movie.Poster;
    }
  };

  UtilsService.del = function(id) {
    var index = $rootScope.currentUser.watched.indexOf(id);
    if (index >= 0) {
      $http.delete('watched/' + id)
        .success(function(user) {
          $rootScope.currentUser = user;
        });
    }
  };
  UtilsService.add = function(id) {
    $http.post('watched/', {id: id})
      .success(function(user) {
        $rootScope.currentUser = user;
      });
  };

  return UtilsService;
});

app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.url("/login");
      });
  }
  $scope.isActive = function (viewLocation) {
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

app.controller("HomeCtrl", ["$location", "$http", "$scope", "$rootScope", "OmdbService", "UtilsService", function($location, $http, $scope, $rootScope, OmdbService, UtilsService) {
  $scope.result = {
    movies: []
  };
  $scope.search = function(movie) {
    var title = movie.title;
    if(typeof title != "undefined" && title.length > 0) {
      OmdbService.search(movie.title)
        .success(function(data){
          $scope.result.movies = data.Search;
        });
    }
  };
  $scope.getImg = UtilsService.getImg;
  $scope.add = UtilsService.add;
  $scope.del = UtilsService.del;
  $scope.watched = function(id) {
    return $rootScope.currentUser.watched.indexOf(id) >= 0;
  };
}]);

app.controller("ProfileCtrl", ["$location", "$http", "$scope", "$rootScope", "OmdbService", "UtilsService", function($location, $http, $scope, $rootScope, OmdbService, UtilsService) {
  console.log('profileCtrl started');
  $scope.movies = [];

  var length = $rootScope.currentUser.watched.length;
  for(i = 0; i < length; i++) {
    var movieId = $rootScope.currentUser.watched[i];
    OmdbService.getById(movieId)
      .success(function(data) {
        $scope.movies.push(data);
      });
  }

  $scope.getImg = UtilsService.getImg;
  $scope.add = UtilsService.del;
  $scope.del = function(id) {
    UtilsService.del(id);

    var length = $scope.movies.length;
    var index = -1;

    for(i = 0; i < length && index < 0; i++) {
      if($scope.movies[i].imdbID === id) {
        index = i;
      }
    }

    if(index >= 0) {
      $scope.movies.splice(index, 1);
    }
  }
}]);
