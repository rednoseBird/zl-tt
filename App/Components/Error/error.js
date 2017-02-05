(()=>{
    `use strict`;

    angular
        .module(`ZL-tt`)
        .directive(`error`, ()=>{
            return {
                templateUrl:    `App/Components/Error/index.html`,
                controller:     `ErrorController`,
                scope:          {
                    resourceError:      `=`
                }

            }
        });
})();