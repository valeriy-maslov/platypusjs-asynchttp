define(['invoke','logger','../../src/com/hcspider/platypusjs/asynchttp/AsyncHTTP'],function(Invoke,Log,HttpClient) {
    function SimpleHeadRequest() {
        
        this.execute = function(onSuccess) {
            var request = HttpClient.head('http://localhost:8084/microservices/stub/');
            HttpClient.execute(request,function(response) {
                var headers = response.allHeaders;
                Log.info(JSON.stringify(headers));
                if (response.statusCode === 200) {
                    HttpClient.close();
                    Invoke.later(onSuccess);
                }
            },function(e) {
                throw e;
            });
        };
    }
    return SimpleHeadRequest;
});