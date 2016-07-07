/**
 * 
 */
define(['logger','./AsyncProcess'],function(Log,Async) {
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
    /**
     * Apache Async HTTP Client JavaScript Wrapper
     * @class
     * @param {type} client
     * @returns {undefined}
     */
    var client;
    function HttpClient(aClient) {
        client = aClient;
        
        Object.defineProperty(this,'start',{
            value: function() {
                client.start();
            }
        });
        
        Object.defineProperty(this,'close',{
            value: function() {
                client.close();
            }
        });
        
        Object.defineProperty(this,'execute', {
            value: function() {
                executeRequest.apply(this,arguments);
            }
        });
    }
    
    /**
     * This function is used as client method and represents encapsulation 
     * of Apache HttpAsyncClient implementing classes method execute()
     * Right now has two ways of use (both similar to Apache)
     * First, 4 argument: request, Http context, onSuccess, onFailure
     * Second, 3 argument: same arguments, but without Http context
     * For more information read Apache HC JavaDocs
     * @see http://hc.apache.org/httpcomponents-asyncclient-dev/httpasyncclient/apidocs/index.html?org/apache/http/nio/client/HttpAsyncClient.html
     * @param {HttpRequest} aRequest
     * @returns {void}
     */
    function executeRequest(aRequest) {
        var aOnSuccess;
        var aOnFailure;
        var aHttpContext;
        if (arguments.length === 3) {
            aOnSuccess = arguments[1];
            aOnFailure = arguments[2];
        } else if (arguments.length === 4) {
            aHttpContext = arguments[1];
            aOnSuccess = arguments[2];
            aOnFailure = arguments[3];
        }
        try {
            client.execute(aRequest.instance,Async.wrapCallbacks(function(result) {
                var entity = result.getEntity();
                var content = EntityUtils.toString(entity);
                aOnSuccess(content);
            },aOnFailure));
        } catch (e) {
            Log.severe(e);
        }
    }
    
    return HttpClient;
});