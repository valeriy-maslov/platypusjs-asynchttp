/**
 * 
 */
define(['./HttpClient'],function(HttpClient) {
    var HttpAsyncClients = Java.type('org.apache.http.impl.nio.client.HttpAsyncClients');

    var module = {};
    
    function custom() {
        return HttpAsyncClients.custom();
    }
    
    function createDefault() {
        var client = HttpAsyncClients.createDefault();
        return new HttpClient(client);
    }
    
    function createSystem() {
        return HttpAsyncClients.createSystem();
    }
    
    module.custom = custom;
    module.createDefault = createDefault;
    module.createSystem = createSystem;
    
    return module;

});