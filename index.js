'use strict';

var React = require('react');
var Router = require('react-router');
var neData = require('ne-data');

var neRender = {

    serverRender: function (server, appmeta, routes){

        server.get('*', function (req, res) {

            Router.run(routes, req.path, function (Root, state) {

                // Log pathString
                console.log(state.routes[1].path.substr(1));
                var neDataReqTimeoutTime = process.env.NEDATA_TIMEOUT_TIME || 6000;
                var neDataReqTimeoutMessage = process.env.NEDATA_TIMEOUT_MSG || "neDataReq Not Authorized";

                // Compile page meta
                var meta = neData.meta(req, appmeta);
                meta.query = req.query;
                meta.params = state.params;
                meta.body = req.body;
                if (req.claims){
                    meta.claims = req.claims;
                }
                if (!req.claims){
                    meta.claims = {
                        displayName: "Not Logged In"
                    };
                }
                if (req.cookies && req.cookies.token){
                    meta.token = req.cookies.token;
                }
                if (req.query && req.query.token){
                    meta.token = req.query.token;
                }

                console.log('ne-render: meta before ne-data');
                console.log(meta);

                // Render the page
                function renderPage (data, fetchError){

                    if (!fetchError) {
                        stopTimeout();
                    }
                    if (fetchError) {
                        data = {
                            message: neDataReqTimeoutMessage
                        };
                    }
                    state.meta = meta;
                    state.data = data;
                    state.query = req.query;
                    state.body = req.body;
                    if (!fetchError) {
                        stopTimeout();
                        state.data = data;
                    }
                    if (req.user) {
                        state.user = req.user;
                    }

                    console.log('ne-render: state before render');
                    console.log(state);

                    console.log('Rendering < ' + meta.title + ' > from Server - START');
                    var html = React.renderToStaticMarkup(React.createElement(Root, state));
                    var doctype = '<!DOCTYPE html>';
                    var fullHtml = doctype + html;
                    res.send(fullHtml);
                    console.log('Rendering < ' + meta.title + ' > from Server - DONE');

                }


                // Handle errors with neData requests
                var timeOut;
                var startTimeout = function  (){
                    timeOut = setTimeout(function(){
                        var data = {};
                        var fetchError = {};
                        renderPage(data, fetchError);
                    },neDataReqTimeoutTime);
                };
                var stopTimeout = function (){
                    clearTimeout(timeOut);
                };
                startTimeout ();



                // Handle neData Requests
                if (meta.neDataBefore) {

                    if (meta.neDataCycle){

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