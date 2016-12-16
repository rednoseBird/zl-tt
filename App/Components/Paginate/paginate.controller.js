(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .controller(`PaginateController`, [`$scope`, `$routeParams`, PaginateController]);

    function PaginateController($scope, $routeParams) {
        $scope.activePage       = $routeParams.p;
        $scope.total            = 0;

        $scope.getPages         = getPages;
        $scope.isActive         = isActive;

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
    }
})();