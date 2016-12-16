(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`MovieController`, [`$scope`, `$routeParams`, `omdb`, MovieController]);

    function MovieController($scope, $routeParams, omdb){
        $scope.info     = {};
        $scope.isLoaded = false;

        $scope.split    = split;

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

        function split(data = "") {
            return data.split(',');
        }
    }
})();