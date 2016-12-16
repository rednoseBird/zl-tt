(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`MoviesController`, [`$scope`, `omdb`, MoviesController]);

    function MoviesController($scope, omdb){
        $scope.page         = 1;
        $scope.movies       = {Search: [{Title: ``}], totalResults: 0};
        $scope.findMovie    = {Title: ``, plot: ``, rt: ``};
        $scope.isLoaded     = false;

        $scope.search       = search;

        $scope.$watch(`findMovie.Title`, ()=>{search()});
        $scope.$watch(`page`, ()=>{search()});

        function search() {
            $scope.isLoaded = false;
            omdb
                .movies($scope.page, $scope.findMovie.Title)
                .then(
                    (response)=>{
                        $scope.movies = response.data;

                        angular.forEach($scope.movies.Search, (value, key)=>{
                            getMovieInfo(key, value.imdbID);
                        });

                        $scope.isLoaded = true;
                    },
                    ()=>{
                        console.log(`failed to load movies list`);
                    }
                );
        }

        function getMovieInfo(key, id) {
            $scope.isLoaded = false;
            omdb
                .movie(id)
                .then(
                    (response)=>{
                        $scope.movies.Search[key].plot   = response.data.Plot;
                        $scope.movies.Search[key].rt     = response.data.imdbRating;

                        $scope.isLoaded = true;
                    },
                    () => {
                        console.log(`failed to get movie info`);
                    }
                );
        }
    }
})();