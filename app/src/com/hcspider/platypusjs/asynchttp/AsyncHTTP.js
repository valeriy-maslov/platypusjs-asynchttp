/**
 * 
 */
define(['logger'
    ,'./HttpAsyncClientsBuilder'
    ,'./HttpRequestBuilder'
],function(Log,ClientsBuilder,RequestBuilder) {
    var module = {};
    
    var client;
    
    function get(URI) {
        var request = RequestBuilder.prepareGetRequest(URI);
        return request;
//        return {
//            execute: function(onSuccess,onFailure) {
//                try {
//                    client.execute(request,Async.wrapCallbacks(function(result) {
//                        var entity = result.getEntity();
//                        var content = EntityUtils.toString(entity);
//                        onSuccess(content);
//                    },onFailure));
//                } catch (e) {
//                    Log.severe(e);
//                }
//            }
//        };
    }
    
    function execute(request,onSuccess,onFailure) {
        if (!client) {
            client = ClientsBuilder.createDefault();
            client.start();
        }
        client.execute(request,onSuccess,onFailure);
    }
    
    function close() {
        if (!client) {
            client.close();
        }
    }
    
    module.get = get;
    module.close = close;
    module.execute = execute;
    
    return module;
});