(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .factory(`omdb`, [`$http`, omdb]);

    function omdb($http){
        const url = `https://www.omdbapi.com/`;
        return {
            movies: function(page, name) {
                return $http
                        .get(url, {params: {
                                        s: `${name}` || `a*`,
                                        y: 2016,
                                        type: `movie`,
                                        page: page
                                    }
                        });
            },
            movie: function(id) {
                return $http
                        .get(url, {params: {
                                        i: id
                                    }
                        });
            }
        }
    }
})();