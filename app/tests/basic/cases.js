define([
    './simple-get-request'
    , './options-request-without-header-parse'
    , './simple-head-request'
    , './post-request-with-response-entity-parsing'
    , './concurrent-requests'
], function() {
    var tests = [];
    for (var i = 0; i < arguments.length - 1; i++) {
        tests.push(new arguments[i]());
    }
    return tests;
});