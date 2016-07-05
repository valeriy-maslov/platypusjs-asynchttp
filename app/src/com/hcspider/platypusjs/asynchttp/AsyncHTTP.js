/**
 * 
 */
define(['logger','./HttpAsyncClientsFactory','./HttpRequestFactory','./AsyncProcess'],function(Log,ClientsFactory,RequestFactory,Async) {
    var Future = Java.type('java.util.concurrent.Future');
    /**
     * @class
     */
    var module = {};
    
    var client;
    
    function get(URI,options) {
        if (!client) {
            client = ClientsFactory.createDefault();
            client.start();
        }
        //Building Request
        var request = RequestFactory.prepareGetRequest(URI,options);
        return {
            execute: function(onSuccess,onFailure) {
                try {
                    client.execute(request,Async.wrapCallbacks(onSuccess,onFailure));
                } catch (e) {
                    Log.severe(e);
                }
            }
        };
    }
    
    function close() {
        if (!client) {
            client.close();
        }
    }
    
    module.get = get;
    module.close = close;
    
    return module;
});