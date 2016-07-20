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
define(['./ContentType'],function(ContentType) {
    var EntityUtils = Java.type('org.apache.http.util.EntityUtils');
    var EntityBuilder = Java.type('org.apache.http.client.entity.EntityBuilder');
    var URLEncodedFormEntity = Java.type('org.apache.http.client.entity.UrlEncodedFormEntity');
    var BasicNameValuePair = Java.type('org.apache.http.message.BasicNameValuePair');
    var BasicNameValuePairNativeArray = Java.type('org.apache.http.message.BasicNameValuePair[]');
    var ArrayUtils = Java.type('java.util.Arrays');
    
    /**
     * Universal wrapper for Apache httpcore entities
     * Used by requests and responses
     * Instantiated automatically
     * Constructor accepts 1 or 2 params
     * In first case it is Java instance of org.apache.http.HttpEntity (builds automatically while response)
     * Second case: first param is instance of org.apache.http.entity.ContentType
     * second param is exact data which should be represented as HttpEntity
     * 
     * @class
     * @returns {undefined}
     */
    
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
        
        /**
         * Java instance of entity
         */
        Object.defineProperty(this,'instance',{
            get: function() {
                return instance;
            }
        });
        
        /**
         * Method which set encoding of entity content
         * @param {String} value
         */
        Object.defineProperty(this,'setCharset',{
            value: function(value) {
                charset = value;
                instance.setContentEncoding(charset);
            }
        });
        
        /**
         * Method returns content length in bytes
         * @return {Number}
         */
        Object.defineProperty(this,'getContentLength',{
            value: function() {
                return instance.getContentLength();
            }
        });
        
        /**
         * Method returns parsed content
         * If there is no parser for exact mime type - returns string representation of content
         * @return {String}
         */
        Object.defineProperty(this,'getContent',{
            value: function() {
                return contentParser.apply(this);
            }
        });
        
        /**
         * Java-like method to make fast representation of entity as String
         * return {String}
         */
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
            } else if(typeof value === 'object') {
                list.push(new BasicNameValuePair(String(name),JSON.stringify(value)));
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