# ne-data (Node Engine Data)

A tool to request data from api's for pages using the Node Engine methodology

To get the most out of ne-data use it with ne-server, ne-render and ne-mongo-rest.

For a smaple of a complete app see ne-sample.

## Get meta for handler

```js

var meta = neData.meta(req, appConfig);

```

## Get pre render data from api's 

```js

neData.before(meta)
    .then(function(data) {
        renderPage(data);
    });
    
```

## Cycle (Not yet implimented)

Use the query params of the url to get batches of the data and then cycle through the batches 

on the client (update dom)

```js 

neData.cycleAfter(meta)
    .then(function(data) {
        updateState(data);
    });

```


on the server (re render)

```js 

neData.cycleAfter(meta)
    .then(function(data) {
        renderPage(data);
    });

```

## Get data to update state after page has rendered (Not yet implimented)

Get data to update state after page has rendered

on the client (update dom)

neData.after(meta)
    .then(function(data) {
        updateState(data);
    });
    
on the server (re render)

neData.after(meta)
    .then(function(data) {
        renderPage(data);
    });


## License 

The MIT License (MIT)

Copyright (c) 2015 Bernard Hamann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.