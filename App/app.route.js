(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .config([
            `$routeProvider`,
            ($routeProvider) => {
                $routeProvider
                    .when(`/movies/:p`, {
                        templateUrl:    `App/Modules/Movies/index.html`,
                        controller:     `MoviesController`,
                        controllerAs:   `movies`,
                        scope:          {}
                    })
                    .when(`/movie/:id`, {
                        templateUrl:    `App/Modules/Movie/index.html`,
                        controller:     `MovieController`,
                        controllerAs:   `movie`,
                        scope:          {}
                    })
                    .when(`/`, {
                        redirectTo:     `/movies/1`
                    })
                    .otherwise({
                        redirectTo:     `/`
                    });
            }]);
})();