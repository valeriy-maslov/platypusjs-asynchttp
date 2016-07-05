/**
 * 
 */
define([],function() {
    var Callbacks = Java.type('com.hcspider.platypusjs.asynchttp.AsyncHTTPCallbacks');
    var Scripts = Java.type('com.eas.script.Scripts');
    
    /**
     * @class
     */
    var module = {};
    
    function wrapCallbacks(aOnSuccess, aOnFailure) {
        return Callbacks.asCallback(Scripts.inContext(Callbacks.asConsumer(aOnSuccess,aOnFailure)));
    }
    
    module.wrapCallbacks = wrapCallbacks;
    
    return module;
});