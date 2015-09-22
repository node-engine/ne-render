'use strict';

var React = require('react');
var Router = require('react-router');
var neData = require('ne-data');

var neRender = {

    serverRender: function (server, appmeta, routes){

        server.get('*', function (req, res) {

            Router.run(routes, req.path, function (Root, state) {

                var pathString = state.routes[1].path.substr(1);

                console.log(pathString);

                function renderPage (data){
                    state.meta = meta;
                    state.data = data;
                    state.query = req.query;
                    console.log('Rendering < ' + meta.title + ' > from Server - START');
                    var html = React.renderToStaticMarkup(React.createElement(Root, state));
                    var doctype = '<!DOCTYPE html>';
                    var fullHtml = doctype + html;
                    res.send(fullHtml);
                    console.log('Rendering ' + meta.title + 'from Server - DONE');
                }

                var meta = neData.meta(req, appmeta);

                if (meta.nedBefore) {

                    if (meta.nedCycle){

                        // this just uses the query params 'limit' and 'batch'
                        // to change the next and previous button url's and
                        // to get different sets of data for different values of limit and batch
                        // the cycle can be on before and after render data

                        neData.cycleBefore(meta)
                            .then(function(data) {
                                renderPage(data);
                            });
                    }

                    else {

                        neData.before(meta)
                            .then(function(data) {
                                renderPage(data);
                            });
                    }

                }

                else {
                    var data = {};
                    renderPage (data);
                }



            });
        });
    },
    clientRender: function(){
        console.log("Future Feature")
    }

};

module.exports = neRender;