define(['invoke','logger','../../src/com/hcspider/platypusjs/asynchttp/AsyncHTTP'],function(Invoke,Log,HttpClient) {
    function ConcurrentRequests() {
        this.execute = function(onSuccess) {
//            var request = HttpClient.post('http://localhost:8084/microservices/stub/application');
//            request.setCharset("UTF-8");
//            request.setContent(request.types.APPLICATION_FORM_URLENCODED,{
//                __moduleName: 'StatelessTg',
//                __methodName: 'getTg',
//                __type: 14,
//                __param: {
//                    start: new Date(),
//                    value: 1
//                }
//            });
            var count = 100;
            var requests = [];
            
            //splitted on two fors to reduce preparing time
            for (var i = 1; i <= count; i++) {
                var request = HttpClient.post('http://localhost:8084/microservices/stub/application');
                request.setCharset("UTF-8");
                requests.push(request);
            }
            
            var results = [];
            var progress = 0;
            var startTotal = new Date();
            for (var i = 0; i < requests.length; i++) {
                var params = {
                    __moduleName: 'StatelessTg',
                    __methodName: 'getTg',
                    __type: 14,
                    __param: {
                        start: new Date(),
                        value: function(x) { return x; }(i)
                    }
                };
                var request = requests[i];
                request.setContent(request.types.APPLICATION_FORM_URLENCODED,params);
                HttpClient.execute(request,function(response) {
                    var end = new Date();
                    progress++;
                    if (response.statusCode === 200) {
                        var res = response.getContent();
                        res.time = Math.abs(res.start.getTime() - end.getTime());
                        Log.info(" *** \n Concurrency test *** Response accepted: \n" +
                                "Value: " + res.value + "\n" +
                                "Result: " + res.result + "\n" +
                                "Time: " + res.time + "ms \n");
                        results.push(res);
                    }
                    if (progress >= requests.length) {
                        var total = Math.abs(startTotal.getTime() - end.getTime());
                        Log.info("\n Concurrent requests test completed!\n" +
                                "Total time: " + total + "ms \n" + 
                                "Requests successfully completed: " + results.length);
                        HttpClient.close();
                        Invoke.later(onSuccess);
                    }
                },function(e) {
                    throw e;
                });
            }
        };
    }
    
    return ConcurrentRequests;
});