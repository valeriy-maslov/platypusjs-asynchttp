/**
 * 
 */
define(['logger'
    ,'./AsyncProcess'
    ,'./HttpResponse'
],function(Log,Async,HttpResponse) {
    /**
     * Apache Async HTTP Client JavaScript Wrapper
     * @class
     * @param {type} client
     * @returns {undefined}
     */
    function HttpClient(aClient) {
        var javaClient = aClient;
        
        Object.defineProperty(this,'instance',{
            get: function() {
                return javaClient;
            }
        });
        
        Object.defineProperty(this,'start',{
            value: function() {
                this.instance.start();
            }
        });
        
        Object.defineProperty(this,'close',{
            value: function() {
                this.instance.close();
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
            this.instance.execute(aRequest.instance,Async.wrapCallbacks(function(result) {
                var response = new HttpResponse(result);
                aOnSuccess(response);
//                var entity = result.getEntity();
//                var content = EntityUtils.toString(entity);
//                aOnSuccess(content);
            },aOnFailure));
        } catch (e) {
            Log.severe(e);
        }
    }
    
    return HttpClient;
});