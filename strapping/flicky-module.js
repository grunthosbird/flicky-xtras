angular.module('appFlicky', [])
  .controller('flickyController', ['$scope', function ($scope) {
    console.log("Controller");

    $scope.doSearch = function () {
      console.log("SEARCH [" + $scope.searchText + "]");
      $scope.goFlickr($scope.searchText);
    };

    function fixEmpty(msg, missing) {
        if (msg.replace(/ /g, '').length < 1) msg = "[no " + missing + "]";
        return msg;
    };

    $scope.goFlickr = function (searchText) {
      var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      $.getJSON(flickrAPI, {
        tags: searchText || "", tagmode: "any", format: "json"
      })
        .fail(function (err) {
          console.log("Unexpected failure: " + err);
        })
        .done(function (data) {
          // Tweak the data slightly, so it better fits our need.
          $.each(data.items, function (idx, item) {
            data.items[idx].title = fixEmpty(item.title, "title");
            data.items[idx].tags = fixEmpty(item.tags, "tags");
            data.items[idx].image = item.media.m;
            data.items[idx].authname = item.author.split('"')[1];
            data.items[idx].authlink = "https://www.flickr.com/people/" + item.author_id;
            data.items[idx].desc = fixEmpty(item.description.split('title="')[1].split('">')[0], "description");
          });
          // Insert the data into scope.
          $scope.flickr = data.items;
          $scope.$apply();
        });
    };
    // Initialise...
    $scope.searchText = "";
    $scope.goFlickr();
  }])

  .directive('flickyDirective', function () {
    return {
      restrict: 'EA',
      scope: {
        pic: '=',
        img: '='
      },
      templateUrl: 'flicky-template.html'
    };
  });