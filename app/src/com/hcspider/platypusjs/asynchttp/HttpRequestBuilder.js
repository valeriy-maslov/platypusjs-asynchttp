/**
 * 
 */
define(['./HttpRequest','./HttpResponse'],function(HttpRequest) {
    
    var module = {};
    
    /**
     * Generates GET method HTTP request with defined options
     * @param {String || URI} URI
     * @param {JSON} headers
     * @param {JSON} options
     * @returns {HttpRequest}
     */
    function prepareGetRequest(URI,headers,options) {
        //URI can be String or java.net.URI
        var request = new HttpRequest('GET',URI,options);
        return request;
    }
    
    function prepareOptionsRequest(URI) {
        var request = new HttpRequest('OPTIONS',URI);
        return request;
    }
    
    function prepareHeadRequest(URI) {
        var request = new HttpRequest('HEAD',URI);
        return request;
    }
    
    module.prepareGetRequest = prepareGetRequest;
    module.prepareOptionsRequest = prepareOptionsRequest;
    module.prepareHeadRequest = prepareHeadRequest;
    
    return module;
});