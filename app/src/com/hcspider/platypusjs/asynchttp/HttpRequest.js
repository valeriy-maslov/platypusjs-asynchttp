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
    
    function HttpRequest(method,URI,options) {
        var self = this;
        var instance = instantiateByMethod(method,URI);
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return instance;
            }
        });
    }
    
    function instantiateByMethod(method,URI) {
        switch(method.toUpperCase()) {
            case 'OPTIONS':
                return new HttpOptions(URI);
            case 'HEAD':
                return new HttpHead(URI);
            case 'GET':
                return new HttpGet(URI);
            default:
                return null;
        }
    }
    
    return HttpRequest;

});