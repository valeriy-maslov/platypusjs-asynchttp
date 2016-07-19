/**
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
define([],function() {
    var JContentType = Java.type('org.apache.http.entity.ContentType');
    
    /**
     * This is static representation of org.apache.http.entity.ContentType constants
     * Each of constants is instance of org.apache.http.entity.ContentType
     * 
     * @see https://hc.apache.org/httpcomponents-core-ga/httpcore/apidocs/org/apache/http/entity/ContentType.html
     */
    
    function ContentType() {
        
        Object.defineProperty(this,'APPLICATION_ATOM_XML', {
            value: JContentType.APPLICATION_ATOM_XML
        });
        
        Object.defineProperty(this,'APPLICATION_FORM_URLENCODED', {
            value: JContentType.APPLICATION_FORM_URLENCODED
        });
        
        Object.defineProperty(this,'APPLICATION_JSON', {
            value: JContentType.APPLICATION_JSON
        });
        
        Object.defineProperty(this,'APPLICATION_OCTET_STREAM', {
            value: JContentType.APPLICATION_OCTET_STREAM
        });
        
        Object.defineProperty(this,'APPLICATION_SVG_XML', {
            value: JContentType.APPLICATION_SVG_XML
        });
        
        Object.defineProperty(this,'APPLICATION_XHTML_XML', {
            value: JContentType.APPLICATION_XHTML_XML
        });
        
        Object.defineProperty(this,'APPLICATION_XML', {
            value: JContentType.APPLICATION_XML
        });
        
        Object.defineProperty(this,'DEFAULT_BINARY', {
            value: JContentType.DEFAULT_BINARY
        });
        
        Object.defineProperty(this,'DEFAULT_TEXT', {
            value: JContentType.DEFAULT_TEXT
        });
        
        Object.defineProperty(this,'MULTIPART_FORM_DATA', {
            value: JContentType.MULTIPART_FORM_DATA
        });
        
        Object.defineProperty(this,'TEXT_HTML', {
            value: JContentType.TEXT_HTML
        });
        
        Object.defineProperty(this,'TEXT_PLAIN', {
            value: JContentType.TEXT_PLAIN
        });
        
        Object.defineProperty(this,'TEXT_XML', {
            value: JContentType.TEXT_XML
        });
        
        Object.defineProperty(this,'WILDCARD', {
            value: JContentType.WILDCARD
        });
        
    }
    
    return new ContentType();
});