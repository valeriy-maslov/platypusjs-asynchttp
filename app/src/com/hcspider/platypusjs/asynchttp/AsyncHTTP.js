/**
 * 
 */
define(['logger'
    ,'./HttpAsyncClientsBuider'
    ,'./HttpRequest'
    ,'./HttpResponse'
],function(Log,ClientsBuilder,Request,HttpResponse) {
    var module = {};
    
    var client;
    
    function get(URI,options) {
        if (!client) {
            client = ClientsBuilder.createDefault();
            client.start();
        }
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
    
    function close() {
        if (!client) {
            client.close();
        }
    }
    
    module.get = get;
    module.close = close;
    
    return module;
});