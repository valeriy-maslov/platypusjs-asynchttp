/**
 * 
 */
define(['./ContentType'],function(ContentType) {
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
    var EntityBuilder = Java.type('org.apache.http.client.entity.EntityBuilder');
    var URLEncoder = Java.type('org.apache.http.client.utils.URLEncodedUtils');
    
    function HttpEntity() {
        
        var instance;
        
        if (arguments.length === 2) {
            var builder = EntityBuilder.create().setContentType(arguments[0]);
            switch(arguments[0]) {
                
                default:
                    builder.setText(String(arguments[1]));
            }
            instance = builder.build();
        } else if (arguments.length === 1) {
            instance = arguments[0];
        }
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return instance;
            }
        });
        
        Object.defineProperty(this,'getContentLength',{
            value: function() {
                return instance.getContentLength();
            }
        });
        
        Object.defineProperty(this,'toString',{
            value: function() {
                return EntityUtils.toString(instance);
            }
        });

    }
    
    return HttpEntity;
});