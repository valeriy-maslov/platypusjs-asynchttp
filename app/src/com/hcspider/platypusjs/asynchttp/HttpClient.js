/**
 *    Copyright 2016 Valeriy Maslov
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *  
 */
define(['logger'
    ,'./AsyncProcess'
    ,'./HttpResponse'
],function(Log,Async,HttpResponse) {
    /**
     * AsyncHTTP wrapper for http client
     * Notice that this is accepts aClient argument on instance construction
     * This is actually Java instance of org.apache.http.impl.nio.client.CloseableHttpAsyncClient
     * If you wanna manually instantiate client in Nashorn environment
     * and avoid problems with types - use HttpAsyncClientsBuilder
     * 
     * @class
     * @param {org.apache.http.impl.nio.client.CloseableHttpAsyncClient} client
     */
    function HttpClient(aClient) {
        var javaClient = aClient;
        
        /**
         * Java instance of http client
         */
        Object.defineProperty(this,'instance',{
            get: function() {
                return javaClient;
            }
        });
        
        /**
         * Method starts client
         * @return {void}
         */
        Object.defineProperty(this,'start',{
            value: function() {
                this.instance.start();
            }
        });
        
        /**
         * Method closes client
         * @return {void}
         */
        Object.defineProperty(this,'close',{
            value: function() {
                this.instance.close();
            }
        });
        
        /**
         * Method executes request
         * For more info see the comments for executeRequest() below
         */
        Object.defineProperty(this,'execute', {
            value: function() {
                executeRequest.apply(this,arguments);
            }
        });
    }
    
    /**
     * This function is used as client method and represents encapsulation 
     * of Apache HttpAsyncClient implementing classes' method execute()
     * Right now has two ways of use (both similar to Apache)
     * First, 4 argument: request, Http context, onSuccess, onFailure
     * Second, 3 argument: same arguments, but without Http context
     * For more information read Apache HC JavaDocs
     * 
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
            },aOnFailure));
        } catch (e) {
            Log.severe(e);
        }
    }
    
    return HttpClient;
});