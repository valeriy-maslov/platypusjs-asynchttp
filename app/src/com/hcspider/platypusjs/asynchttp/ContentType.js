/**
 * 
 */
define([],function() {
    var JContentType = Java.type('org.apache.http.entity.ContentType');
    
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