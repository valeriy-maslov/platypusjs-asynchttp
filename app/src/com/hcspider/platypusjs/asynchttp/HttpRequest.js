/**
 *
 */
define(['./HttpEntity','./ContentType'],function(HttpEntity,ContentType) {
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
        var charset = "UTF-8";
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return instance;
            }
        });
        
        Object.defineProperty(this,'setContent',{
            value: function(type,content) {
                var entity = new HttpEntity(type.withCharset(charset),content);
                instance.setEntity(entity.instance);
            }
        });
        
        Object.defineProperty(this,'setCharset',{
            value: function(value) {
                charset = value;
                var entity = instance.getEntity();
                if (entity) {
                    entity.setContentEncoding(charset);
                    instance.setEntity(entity);
                }
            }
        });
        
        Object.defineProperty(this,'types',{
            value: ContentType
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
            case 'POST':
                return new HttpPost(URI);
            default:
                return null;
        }
    }
    
    return HttpRequest;

});