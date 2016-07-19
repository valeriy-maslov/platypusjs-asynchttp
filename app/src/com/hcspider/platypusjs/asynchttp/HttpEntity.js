/**
 * 
 */
define(['./ContentType'],function(ContentType) {
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
    var EntityBuilder = Java.type('org.apache.http.client.entity.EntityBuilder');
    var URLEncodedFormEntity = Java.type('org.apache.http.client.entity.UrlEncodedFormEntity');
    var BasicNameValuePair = Java.type('org.apache.http.message.BasicNameValuePair');
    var BasicNameValuePairNativeArray = Java.type('org.apache.http.message.BasicNameValuePair[]');
    var ArrayUtils = Java.type('java.util.Arrays');
    
    function HttpEntity() {
        
        var instance;
        var charset = "UTF-8";
        
        if (arguments.length === 2) {
            
            switch(arguments[0].getMimeType()) {
                case ContentType.APPLICATION_FORM_URLENCODED.getMimeType():
                    var content = buildListOfNameValuePairsFromJSON(arguments[1]);
                    var contentAsNativeArray = Java.to(content,BasicNameValuePairNativeArray);
                    var list = ArrayUtils.asList(contentAsNativeArray);
                    instance = new URLEncodedFormEntity(list);
                    break;
                    
                default:
                    var builder = EntityBuilder.create().setContentType(arguments[0]).setContentEncoding(charset);
                    builder.setText(String(arguments[1]));
                    instance = builder.build();
            }
        } else if (arguments.length === 1) {
            instance = arguments[0];
        }
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return instance;
            }
        });
        
        Object.defineProperty(this,'setCharset',{
            value: function(value) {
                charset = value;
                instance.setContentEncoding(charset);
            }
        });
        
        Object.defineProperty(this,'getContentLength',{
            value: function() {
                return instance.getContentLength();
            }
        });
        
        Object.defineProperty(this,'getContent',{
            value: function() {
                return contentParser.apply(this);
            }
        });
        
        Object.defineProperty(this,'toString',{
            value: function() {
                return EntityUtils.toString(instance);
            }
        });

    }
    
    function buildListOfNameValuePairsFromJSON(content) {
        var list = [];
        for (var name in content) {
            var value = content[name];
            if (value instanceof Array) {
                value.forEach(function(item) {
                    list.push(new BasicNameValuePair(String(name+'[]'),JSON.stringify(item)));
                });
            } else {
                list.push(new BasicNameValuePair(String(name),String(value)));
            }
        }
        
        return list;
    }
    
    function contentParser() {
        if (this.instance) {
            var mimeType = this.instance.getContentType().getValue().split(";")[0].trim();
            switch (mimeType) {
                case ContentType.APPLICATION_JSON.getMimeType():
                    var parsed = JSON.parse(EntityUtils.toString(this.instance), function(k,v) {
                        if (typeof v === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(v)) {
                                return new Date(v);
                        } else {
                                return v;
                        }
                    });
                    return parsed;
                default:
                    return EntityUtils.toString(this.instance);
            }
        }
    }
    
    return HttpEntity;
});