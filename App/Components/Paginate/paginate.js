(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .directive(`paginate`, ()=>{
            return {
                templateUrl:    `App/Components/Paginate/index.html`,
                controller:     `PaginateController`,
                scope: {
                    activePage: `=`,
                    total:      `@`
                }
            }
        });
})();