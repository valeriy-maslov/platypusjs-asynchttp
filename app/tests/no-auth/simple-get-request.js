define(['invoke','logger','../../src/com/hcspider/platypusjs/asynchttp/AsyncHTTP'],function(Invoke,Log,HttpClient) {
    function OwnModuleCallTest() {
        this.execute = function(onSuccess) {
            HttpClient.get('http://localhost:8084/microservices/stub?__moduleName=StatelessTg&__methodName=numberTwo').execute(function(value) {
                if (value === 2) {
                    Invoke.later(onSuccess);
                }
            }, function(e) {
                throw e;
            });
        };
    }
    return OwnModuleCallTest;
});