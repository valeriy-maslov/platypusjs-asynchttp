# AsyncHTTP for Nashorn
### What is this?
AsyncHTTP is JavaScript library for Nashorn Script Engine which provides fluent API for working with [Apache HttpAsyncClient] with JavaScript from Nashorn environment.

## Please notice that product is currently on pre-alpha stage!

### Features
AsyncHTTP stable release will include same most used features as [Apache HttpAsyncClient] provides. More information will be available as soon as stable release will come.

## How to use?
AsyncHTTP provides a few ways to work with Apache HttpAsyncClient in Nashorn environment. It's based on AMD specification. Actually it can be used in any Nashorn environment with AMD support.
#### Installation
So, first of all you need proper installation on AsyncHTTP. 

It requires [Apache HttpAsyncClient jars].
At moment of development Apache HttpAsyncClient v.4.1 was used. There were not support tests for older versions.

Next step is installing of Java layer of AsyncHTTP. There is [AsyncHTTP Java Layer] repository.

Final step is installing AsyncHTTP, which is really easy. Just clone this repository and copy AsyncHTTP sources from `app/src/com/hcspider/platypusjs/asynchttp` into location where sources of your project is. After that you can simply use that like any other AMD module.

#### Quick Start

AsyncHTTP has the module with fluent API, which allows to work with it very easy. In AMD all you need is to include it in dependency array of `define()` in your sources, for example:

```JavaScript
    define(['logger','asynchttp/AsyncHTTP'],function(Log,HttpClient) {
        // Your code goes here
    });
```

Also you can connect AsyncHTTP with `require()`.

To do your first request you need to create it, for example:

```JavaScript
    var request = HttpClient.get("http://google.com");
```

Next we need to execute this query, like this:

```JavaScript
    HttpClient.execute(request,function(response) {
        // Here you can do things with the response
        Log.info(response.getContent());
    }, function(error) {
        //And here you can do another things if your request execution is failed
    });
```

And here is full source of this example:

```JavaScript
    define(['logger','asynchttp/AsyncHTTP'],function(Log,HttpClient) {
        function GetGooglePage() {
            var request = HttpClient.get("http://google.com");
            HttpClient.execute(request,function(response) {
                Log.info(response.getContent());
            }, function(error) {
                Log.severe("Request failed!");
            });
        }
        
        return GetGooglePage;
    });
```

Full support of Apache HttpAsyncClient planned in future. More information will be available later. Check for updates.


## License

Copyright 2016 Valeriy Maslov

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


[Platypus.js]: <http://platypus-platform.org/>
[Apache HttpAsyncClient]: <https://hc.apache.org/httpcomponents-asyncclient-4.1.x/index.html>
[Apache HttpAsyncClient jars]: <http://hc.apache.org/httpcomponents-asyncclient-4.1.x/download.html>
[AsyncHTTP Java Layer]: <https://github.com/hcspidergrasp/platypusjs-asynchttp-javalayer>
