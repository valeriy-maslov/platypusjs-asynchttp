/**
 * AsyncHTTP is JavaScript library for Platypus.js which provides 
 * fluent API for working with Apache HttpAsyncClient 
 * with JavaScript from Nashorn environment.
 * 
 * General GitHub Repository
 * @link https://github.com/hcspidergrasp/platypusjs-asynchttp
 * 
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
    ,'./HttpAsyncClientsBuilder'
    ,'./HttpRequestBuilder'
],function(Log,ClientsBuilder,RequestBuilder) {
    
    /**
     * AsyncHTTP module provides fluent API for working with Apache Asynchttpclient
     * It use JS wrappers for Java classes and their instances
     */
    
    var module = {};
    
    var client; //Contains instance of http client wrapped in HttpClient AMD module
    
    /**
     * Quickly instantiate GET request
     * Can accept URI as a string or java.net.URI
     * 
     * @param {String || java.net.URI} URI
     * @returns {HttpRequest}
     */
    function get(URI) {
        var request = RequestBuilder.prepareGetRequest(URI);
        return request;
    }
    
    /**
     * Quickly instantiate OPTIONS request
     * Can accept URI as a string or java.net.URI
     * 
     * @param {String || java.net.URI} URI
     * @returns {HttpRequest}
     */    
    function options(URI) {
        var request = RequestBuilder.prepareOptionsRequest(URI);
        return request;
    }
    
    /**
     * Quickly instantiate HEAD request
     * Can accept URI as a string or java.net.URI
     * 
     * @param {String || java.net.URI} URI
     * @returns {HttpRequest}
     */    
    function head(URI) {
        var request = RequestBuilder.prepareHeadRequest(URI);
        return request;
    }
    
    /**
     * Quickly instantiate POST request
     * Can accept URI as a string or java.net.URI
     * 
     * @param {String || java.net.URI} URI
     * @returns {HttpRequest}
     */
    function post(URI) {
        var request = RequestBuilder.preparePostRequest(URI);
        return request;
    }
    
    /**
     * Once any type of request was instantiated and configured
     * it must be executed by client
     * This function accepts instance of HttpRequest and two callbacks
     * Also notice that if there is not setted manual configuration for client
     * so this method creates it with default configuration and starts
     * 
     * @param {HttpRequest} request
     * @param {Function} onSuccess
     * @param {Function} onFailure
     * @returns {void}
     */
    function execute(request,onSuccess,onFailure) {
        if (!client) {
            client = ClientsBuilder.createDefault();
            client.start();
        }
        client.execute(request,onSuccess,onFailure);
    }
    
    /**
     * Because of AsyncHTTP uses org.apache.http.impl.nio.client.CloseableHttpAsyncClient
     * so it must be closed after use
     * Use this function to do this
     * 
     * @returns {void}
     */    
    function close() {
        if (!client) {
            client.close();
        }
    }
    
    module.get = get;
    module.options = options;
    module.head = head;
    module.post = post;
    module.close = close;
    module.execute = execute;
    
    return module;
});