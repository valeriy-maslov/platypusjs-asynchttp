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
define(['./HttpRequest','./HttpResponse'],function(HttpRequest) {
    
    var module = {};
    
    /**
     * Generates GET method HTTP request with defined options
     * @param {String || URI} URI
     * @param {JSON} headers
     * @param {JSON} options
     * @returns {HttpRequest}
     */
    function prepareGetRequest(URI,headers,options) {
        //URI can be String or java.net.URI
        var request = new HttpRequest('GET',URI,options);
        return request;
    }
    
    function prepareOptionsRequest(URI) {
        var request = new HttpRequest('OPTIONS',URI);
        return request;
    }
    
    function prepareHeadRequest(URI) {
        var request = new HttpRequest('HEAD',URI);
        return request;
    }
    
    function preparePostRequest(URI) {
        var request = new HttpRequest('POST',URI);
        return request;
    }
    
    module.prepareGetRequest = prepareGetRequest;
    module.prepareOptionsRequest = prepareOptionsRequest;
    module.prepareHeadRequest = prepareHeadRequest;
    module.preparePostRequest = preparePostRequest;
    
    return module;
});