/**
 * 
 */
define(['logger','./HttpAsyncClientsFactory','./HttpRequestFactory','./AsyncProcess'],function(Log,ClientsFactory,RequestFactory,Async) {
    var Future = Java.type('java.util.concurrent.Future');
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
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
                    client.execute(request,Async.wrapCallbacks(function(result) {
                        var entity = result.getEntity();
                        var content = EntityUtils.toString(entity);
                        onSuccess(content);
                    },onFailure));
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