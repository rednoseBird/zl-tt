(()=> {
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`SearchController`, [`$scope`, SearchController]);

    function SearchController($scope) {
        $scope.modal        = false;
        $scope.movieTitle   = ``;
        $scope.toggleModal  = toggleModal;

        function toggleModal(status) {
            $scope.modal = status;
            return $scope.modal;
        }
    }
})();