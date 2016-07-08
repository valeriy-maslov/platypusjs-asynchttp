/**
 * 
 */
define([],function() {
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
    
    function HttpResponse(response) {
        var javaResponse = response;
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return javaResponse;
            }
        });
        
        Object.defineProperty(this,'statusCode',{
            get: function() {
                return javaResponse.getStatusLine().getStatusCode();
            }
        });
        
        Object.defineProperty(this,'reasonPhrase',{
            get: function() {
                return javaResponse.getStatusLine().getReasonPhrase();
            }
        });
        
        Object.defineProperty(this,'protocolVersion',{
            get: function() {
                var proto = javaResponse.getStatusLine().getProtocolVersion();
                return {
                    major: proto.major,
                    minor: proto.minor,
                    protocol: proto.protocol
                };
            }
        });
        
        Object.defineProperty(this,'containsHeader',{
            value: function() {
                return isHeaderExists.apply(this,arguments);
            }
        });
        
        Object.defineProperty(this,'allHeaders',{
            get: function() {
                return getAllHeaders.apply(this,arguments);
            }
        });
        
        Object.defineProperty(this,'content',{
            get: function() {
                return getContent.apply(this);
            }
        });
    }
    
    function isHeaderExists(name) {
        return this.instance.containsHeader(name);
    }
    
    function getAllHeaders() {
        var headers = Java.from(this.instance.getAllHeaders());
        var parsed = [];
        headers.forEach(function(item) {
            parsed.push({
                name: item.getName(),
                value: parseHeaderElements(item)
            });
        });
        return parsed;
    }
    
    function parseHeaderElements(header) {
        var headerElements = Java.from(header.getElements());
        var elements = [];
        headerElements.forEach(function(item) {
            var element = [];
            var parameters = Java.from(item.getParameters());
            parameters.forEach(function(param) {
                element.push({
                    name: param.getName(),
                    value: param.getValue()
                });
            });
            elements.push({
                name: item.getName(),
                value: element,
                count: item.getParameterCount()
            });
        });
        return elements;
    }
    
    function getContent() {
        var entity = this.instance.getEntity();
        var content = EntityUtils.toString(entity);
        return content;
    }
    
    return HttpResponse;
});