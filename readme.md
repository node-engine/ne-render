# ne-render (Node Engine Render)

## Server rendering in NodeJS with React and React-Router 

A tool to render pages Node Engine style on the server

// Server Rendering with React Router but after getting data from a api request.
// This version stores the data request in the page object for that path

```js

var neRender = require('ne-render');

var globals = require('../config/globals.json');
var routes = require ('./universal/routes');

var pageAPIPath = "http://localhost:3001/api/page?f1=path&v1=";
neRender.serverRender(server, routes, pageAPIPath, globals);


```