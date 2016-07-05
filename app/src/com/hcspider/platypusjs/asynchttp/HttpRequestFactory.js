/**
 * 
 */
define([],function() {
    var HttpGet = Java.type('org.apache.http.client.methods.HttpGet');
    var HttpHead = Java.type('org.apache.http.client.methods.HttpHead');
    var HttpOptions = Java.type('org.apache.http.client.methods.HttpOptions');
    var HttpPatch = Java.type('org.apache.http.client.methods.HttpPatch');
    var HttpPost = Java.type('org.apache.http.client.methods.HttpPost');
    var HttpPut = Java.type('org.apache.http.client.methods.HttpPut');
    var HttpTrace = Java.type('org.apache.http.client.methods.HttpTrace');
    
    /**
     * @class
     */
    var module = {};
    
    function prepareGetRequest(URI, options) {
        var request = new HttpGet(URI);
        if (options) {
            //Options must be here
        }
        return request;
    }
    
    module.prepareGetRequest = prepareGetRequest;
    
    return module;
});