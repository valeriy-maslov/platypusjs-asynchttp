define(['invoke','logger','../../src/com/hcspider/platypusjs/asynchttp/AsyncHTTP'],function(Invoke,Log,HttpClient) {
    function PostRequestWithResponseEntityParsing() {
        
        function checkResponseEntity(r,a) {
            //Structure
            if (!(a.SomeNum && a.SomeString && a.SomeDate && a.SomeObj && a.SomeObj.age && a.SomeObj.year)) {
                return false;
            } else {
                //Values
                if (a.SomeNum !== r.SomeNum && a.SomeString !== r.SomeString
                        && a.SomeDate.getTime() !== r.SomeDate.getTime()
                        && a.SomeObj.age !== r.SomeObj.age
                        && a.SomeObj.year !== r.SomeObj.year) {
                    return false;
                }
                 else {
                     return true;
                 }
            }
        }
        
        this.execute = function(onSuccess) {
            var toCheck = {
                SomeNum: 888,
                SomeString: 'John Doe',
                SomeDate: new Date(),
                SomeObj: {
                    age: 26,
                    year: 1989
                }
            };
            var params = {
                __moduleName: 'StatelessTg',
                __methodName: 'postRequest',
                __type: 14,
                __param: [toCheck.SomeNum,toCheck.SomeString,toCheck.SomeDate,toCheck.SomeObj]
            };
            var request = HttpClient.post('http://localhost:8084/microservices/stub/application');
            request.setCharset("UTF-8");
            request.setContent(request.types.APPLICATION_FORM_URLENCODED,params);
            HttpClient.execute(request,function(response) {
                var headers = response.allHeaders;
                Log.info(JSON.stringify(headers));
                if (response.statusCode === 200 && response.getContentLength() > 0) {
                    var responseContent = response.getContent();
                    Log.info(responseContent.toString());
                    if (checkResponseEntity(toCheck,responseContent)) {
                        HttpClient.close();
                        Invoke.later(onSuccess);
                    } else {
                        throw 'Reponse content wrong';
                    }
                }
            },function(e) {
                throw e;
            });
        };
    }
    return PostRequestWithResponseEntityParsing;
});