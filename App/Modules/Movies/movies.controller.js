(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`MoviesController`, [`$scope`, `omdb`, `$routeParams`, MoviesController]);

    function MoviesController($scope, omdb, $routeParams){
        $scope.movies       = {Search: [{Title: ``}], totalResults: 0};
        $scope.maxVal       = 10;
        $scope.findMovie    = {Title: ``, plot: ``, rt: ``};
        $scope.isLoaded     = false;

        $scope.activePage       = $routeParams.p;
        $scope.total            = 0;

        $scope.getPages         = getPages;
        $scope.isActive         = isActive;
        $scope.byRating         = byRating;

        $scope.search           = search;

        $scope.$watch(`findMovie.Title`, ()=>{search()});

        function search() {
            $scope.isLoaded = false;
            omdb
                .movies($scope.activePage, $scope.findMovie.Title)
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
                        $scope.movies.Search[key].rt     = parseFloat(response.data.imdbRating);

                        $scope.isLoaded = true;
                    },
                    () => {
                        console.log(`failed to get movie info`);
                    }
                );
        }

        function getPages() {
            let maxPages = !isNaN(Math.ceil($scope.total/10))
                    ? Math.ceil($scope.total/10)
                    : 0,
                getPages = (from, to) => {
                    let pages = [];
                    for(let i=from; i<=to; i++) {
                        pages.push(i);
                    }
                    return pages;
                };

            if($scope.activePage < 10) {
                return getPages(1, 10);
            } else if ( parseInt($scope.activePage) > maxPages-10
                && parseInt($scope.activePage) <= maxPages) {
                return getPages(maxPages-10, maxPages);
            } else {
                return getPages(parseInt($scope.activePage)-5, parseInt($scope.activePage)+5);
            }
        }

        function isActive(page) {
            return page == $scope.activePage;
        }

        function byRating(fieldName) {
            const minValue = 0;

            return function predicateFunc(item) {
                return minValue <= item[fieldName] && item[fieldName] <= $scope.maxVal;
            };
        };
    }
})();