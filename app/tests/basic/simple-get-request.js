define(['invoke','logger','../../src/com/hcspider/platypusjs/asynchttp/AsyncHTTP'],function(Invoke,Log,HttpClient) {
    function SimpleGetRequest() {
        this.execute = function(onSuccess) {
            var request = HttpClient.get('http://localhost:8084/microservices/stub/application?__moduleName=StatelessTg&__methodName=numberTwo');
            HttpClient.execute(request,function(value) {
                var headers = value.allHeaders;
                Log.info(typeof value);
                Log.info( headers instanceof Array);
                Log.info(JSON.stringify(value.protocolVersion));
                Log.info(JSON.stringify(headers));
                Log.info('Date: ' + value.containsHeader('Date'));
                Log.info('Content-Length: ' + value.containsHeader('Content-Length'));
                if (value.content == 2) {
                    HttpClient.close();
                    Invoke.later(onSuccess);
                }
            }, function(e) {
                throw e;
            });
        };
    }
    return SimpleGetRequest;
});