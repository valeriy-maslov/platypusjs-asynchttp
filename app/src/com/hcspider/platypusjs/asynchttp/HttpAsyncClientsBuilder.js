/**
 * 
 */
define([],function() {
    var HttpAsyncClients = Java.type('org.apache.http.impl.nio.client.HttpAsyncClients');
    
    /**
     * @class
     */
    var module = {};
    
    function custom() {
        return HttpAsyncClients.custom();
    }
    
    function createDefault() {
        return HttpAsyncClients.createDefault();
    }
    
    function createSystem() {
        return HttpAsyncClients.createSystem();
    }
    
    module.custom = custom;
    module.createDefault = createDefault;
    module.createSystem = createSystem;
    
    return module;

});