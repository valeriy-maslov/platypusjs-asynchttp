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
                valueString: item.getValue(),
                elements: parseHeaderElements(item)
            });
        });
        return parsed;
    }
    
    function parseHeaderElements(header) {
        var elements = Java.from(header.getElements());
        var parsed = [];
        elements.forEach(function(item) {
            if (isHeaderElementHasSeparatedParameters(item)) {
                parsed.push({
                    name: item.getName(),
                    valueString: item.getValue(),
                    params: parseParametersInHeaderElement(item)
                });
            } else {
                parsed.push({
                    name: item.getName(),
                    valueString: item.getValue()
                });
            }
        });
        return parsed;
    }
    
    function isHeaderElementHasSeparatedParameters(element) {
        return element.getParameterCount() > 0;
    }
    
    function parseParametersInHeaderElement(element) {
        var params = Java.from(element.getParameters());
        var parsed = [];
        params.forEach(function(item) {
            parsed.push({
                name: item.getName(),
                value: item.getValue()
            });
        });
        return parsed;
    }
    
    function getContent() {
        var entity = this.instance.getEntity();
        var content = EntityUtils.toString(entity);
        return content;
    }
    
    return HttpResponse;
});