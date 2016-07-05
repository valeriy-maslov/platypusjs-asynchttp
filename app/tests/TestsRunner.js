/**
 * 
 * @author spidergrasp
 */
define(['invoke', 'forms', 'ui'], function (Invoke, Forms, Ui, ModuleName) {
    function TestsRunner() {
        var self = this
                , form = Forms.loadForm(ModuleName);
        
        self.show = function () {
            form.show();
        };
        
        form.btnRun.onActionPerformed = function(event) {
            require(['logger','./no-auth/cases'
//                ,'./local-auth/cases'
//                ,'./remote-auth/cases'
            ], function(Log, NoAuthCases, LocalAuthCases, RemoteAuthCases) {
                var tests = [];
                Array.prototype.push.apply(tests,NoAuthCases);
//                Array.prototype.push.apply(tests,LocalAuthCases);
//                Array.prototype.push.apply(tests,RemoteAuthCases);
                form.pbRun.minimum = 0;
                form.pbRun.maximum = tests.length;
                form.pbRun.value = 0;
                form.taResults.text = '';
                form.btnRun.enabled = false;
                var idx = 0;
                function runTest() {
                    if (idx < tests.length) {
                        var current = tests[idx];
                        current.execute(function() {
                            form.pbRun.value++;
                            var result = current.constructor.name + " - OK";
                            if (form.taResults.text) {
                                form.taResults.text += '\n';
                            }
                            form.taResults.text += result;
                            Log.info(result);
                            idx++;
                            Invoke.later(runTest);
                        }, function(e) {
                            form.pbRun.value++;
                            var result = current.constructor.name + " - FAIL \n";
                            result += 'Reason: ' + e;
                            if (form.taResults.text) {
                                form.taResults.text += '\n';
                            }
                            form.taResults.text += result;
                            Log.severe(result);
                            idx++;
                            Invoke.later(runTest);
                        });
                    } else {
                        form.btnRun.enabled = true;
                    }
                }
                Invoke.later(runTest);
            });
        };
        
    }
    return TestsRunner;
});
