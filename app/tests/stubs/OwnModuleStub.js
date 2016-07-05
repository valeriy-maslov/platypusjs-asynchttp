/**
 * 
 * @author spidergrasp
 * @stateless
 * @public 
 */
define(['orm'], function (Orm, ModuleName) {
    function module_constructor() {
        var self = this, model = Orm.loadModel(ModuleName);

        self.tan = function(v,onSuccess) {
            onSuccess(Math.tan(v));
        };
    }
    return module_constructor;
});
