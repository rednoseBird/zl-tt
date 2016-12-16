(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .directive(`search`, ()=>{
            return {
                templateUrl:    `App/Components/Search/index.html`,
                controller:     `SearchController`,
                scope: {
                    findMovie:  `=`
                }
            }
        });
})();