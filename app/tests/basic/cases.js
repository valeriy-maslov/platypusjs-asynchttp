define([
    './simple-get-request'
], function() {
    var tests = [];
    for (var i = 0; i < arguments.length - 1; i++) {
        tests.push(new arguments[i]());
    }
    return tests;
});