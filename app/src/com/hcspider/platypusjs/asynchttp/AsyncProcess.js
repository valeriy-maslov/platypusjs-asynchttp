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
define([],function() {
    var Callbacks = Java.type('com.hcspider.platypusjs.asynchttp.AsyncHTTPCallbacks');
    var Scripts = Java.type('com.eas.script.Scripts');
    
    /**
     * Module contains functions to call JS callbacks from Apache Httpclient
     */
    var module = {};
    
    function wrapCallbacks(aOnSuccess, aOnFailure) {
        var ctx = Scripts.getContext();
        if (ctx) {
            ctx.incAsyncsCount();
        }
        return Callbacks.asCallback(Scripts.inContext(Callbacks.asConsumer(aOnSuccess,aOnFailure)));
    }
    
    module.wrapCallbacks = wrapCallbacks;
    
    return module;
});