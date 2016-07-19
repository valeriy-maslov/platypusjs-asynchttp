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
define(['./HttpEntity'],function(HttpEntity) {
    
    /**
     * Wrapper for Apache HttpResponse
     * Constructor get Java org.apache.http.HttpResponse instance
     * Instantiated as an argument of onSuccess callback function after execution
     * 
     * @class
     * @param {org.apache.http.HttpResponse} response
     */
    function HttpResponse(response) {
        var javaResponse = response;
        var entity = javaResponse ? new HttpEntity(javaResponse.getEntity()) : null;
        
        /**
         * Java instance of response
         */
        Object.defineProperty(this,'instance',{
            get: function() {
                return javaResponse;
            }
        });
        
        /**
         * Property retrieves status code of request execution
         */
        Object.defineProperty(this,'statusCode',{
            get: function() {
                return javaResponse.getStatusLine().getStatusCode();
            }
        });
        
        /**
         * Property retrieves description phrase of response status
         */
        Object.defineProperty(this,'reasonPhrase',{
            get: function() {
                return javaResponse.getStatusLine().getReasonPhrase();
            }
        });
        
        /**
         * Property retrieves object which contains all protocol version data
         */        
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
        
        /**
         * Method shows if specified header exists in this response
         * @return {boolean}
         */
        Object.defineProperty(this,'containsHeader',{
            value: function() {
                return isHeaderExists.apply(this,arguments);
            }
        });
        
        /**
         * Property with parsed array of all headers (key-value pairs)
         */        
        Object.defineProperty(this,'allHeaders',{
            get: function() {
                return getAllHeaders.apply(this,arguments);
            }
        });
        
        /**
         * Method returns parsed content inside response body
         * @return {Object}
         */
        Object.defineProperty(this,'getContent',{
            value: function() {
                return entity.getContent();
            }
        });
        
        /**
         * Method returns content lenght in bytes
         * @return {Number}
         */
        Object.defineProperty(this,'getContentLength',{
            value: function() {
                return entity.getContentLength();
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
    
    return HttpResponse;
});