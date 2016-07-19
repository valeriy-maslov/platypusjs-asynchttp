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
define(['./HttpClient'],function(HttpClient) {
    var HttpAsyncClients = Java.type('org.apache.http.impl.nio.client.HttpAsyncClients');
    
    /**
     * HttpAsyncClientsBuilder is module for easy building and customizing
     * http clients
     * Based on org.apache.http.impl.nio.client.HttpAsyncClients
     */
    var module = {};
    
    function custom() {
        return HttpAsyncClients.custom();
    }
    
    /**
     * Creates Java async http client instance wrapped in JS with default configuration
     * @returns {HttpAsyncClientsBuilder_L17.HttpClient}
     */
    function createDefault() {
        var client = HttpAsyncClients.createDefault();
        return new HttpClient(client);
    }
    
    /**
     * Creates Java async http client instance
     * @returns {}
     */
    function createSystem() {
        return HttpAsyncClients.createSystem();
    }
    
    module.custom = custom;
    module.createDefault = createDefault;
    module.createSystem = createSystem;
    
    return module;

});