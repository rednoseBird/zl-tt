(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`MoviesController`, [`$scope`, `omdb`, `$routeParams`, MoviesController]);

    function MoviesController($scope, omdb, $routeParams){
        $scope.movies           = {Search: [{Title: ``}], totalResults: 0};
        $scope.findMovie        = {plot: ``, rt: ``};
        $scope.movieTitle       = ``;
        $scope.maxVal           = 10;
        $scope.isLoaded         = false;
        $scope.resourceError    = ``;

        $scope.activePage       = $routeParams.p;
        $scope.total            = 0;

        $scope.getPages         = getPages;
        $scope.isActive         = isActive;
        $scope.byRating         = byRating;

        $scope.search           = search;

        $scope.$watch(`movieTitle`, (oTitle, nTitle)=>{
            $scope.activePage = oTitle !== nTitle ? 1 : $scope.activePage;
            search();
        });

        function search() {
            $scope.isLoaded = false;
            omdb
                .movies($scope.activePage, $scope.movieTitle)
                .then(
                    (response)=>{
                        $scope.movies = response.data || response;

                        angular.forEach($scope.movies.Search, (value, key)=>{
                            getMovieInfo(key, value.imdbID);
                        });

                        $scope.isLoaded = true;

                        if (response.data.Error) {
                            console.log('error '+response.data.Error);
                            $scope.resourceError = response.data.Error;
                        }
                    },
                    (response)=>{
                        console.log(`failed to load movies list: ${response.data}`);
                        $scope.resourceError = response.data;
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

                        if (response.data.Error) {
                            console.log('error '+response.data.Error);
                            $scope.resourceError = response.data.Error;
                        }
                    },
                    (response) => {
                        $scope.resourceError = response.data;
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