# ne-render-server (Node Engine Server Rendering)

A tool to render pages Node Engine style on the server

// Server Rendering with React Router but after getting data from a api request.
// This version stores the data request in the page object for that path

```js
var pageAPIPath = "http://localhost:3001/api/page?f1=path&v1=";
renderServer(server, routes, pageAPIPath, globals);

```