(()=> {
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`ErrorController`, [`$scope`, ErrorController]);

    function ErrorController($scope) {
        $scope.modal        = !!$scope.responseError; //false;
        $scope.movieTitle   = ``;
        $scope.toggleModal  = toggleModal;

        function toggleModal(status) {
            $scope.modal = status;
            return $scope.modal;
        }
    }
})();
