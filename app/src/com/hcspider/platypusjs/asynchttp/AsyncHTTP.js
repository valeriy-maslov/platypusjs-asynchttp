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
    }
    
    function options(URI) {
        var request = RequestBuilder.prepareOptionsRequest(URI);
        return request;
    }
    
    function head(URI) {
        var request = RequestBuilder.prepareHeadRequest(URI);
        return request;
    }
    
    function post(URI) {
        var request = RequestBuilder.preparePostRequest(URI);
        return request;
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
    module.options = options;
    module.head = head;
    module.post = post;
    module.close = close;
    module.execute = execute;
    
    return module;
});