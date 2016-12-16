(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`MovieController`, [`$scope`, `$routeParams`, `omdb`, MovieController]);

    function MovieController($scope, $routeParams, omdb){
        $scope.info     = {};
        $scope.isLoaded = false;

        $scope.hide = hide;

        omdb
            .movie($routeParams.id)
            .then(
                (response)=>{
                    $scope.info = response.data;
                    $scope.isLoaded = true;
                },
                ()=>{
                    console.log(`error`);
                }
            );

        function hide(title) {
            return [`Title`, `Poster`, `Response`, `imdbID`].indexOf(title) !== -1;
        }
    }
})();