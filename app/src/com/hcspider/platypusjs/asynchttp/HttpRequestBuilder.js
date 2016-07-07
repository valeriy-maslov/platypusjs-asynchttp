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
    
    module.prepareGetRequest = prepareGetRequest;
    
    return module;
});