'use strict';

var React = require('react');
var Router = require('react-router');
var axios = require ('axios');
var _ = require('lodash');

var neRender = {

    meta: function (req, appmeta, pathForMeta){

        var path = pathForMeta;

        console.log('');
        console.log('');
        console.log('ne-data: pathForMeta');
        console.log(pathForMeta);
        console.log('');
        console.log('');

        var meta = _.find(appmeta, { path: path });

        if (meta === undefined){

            var meta = {
                path: "path not in config",
                meta:
                {
                    title: "Undefined path: " + req.path,
                    description: "Not found"
                }
            };

            meta.appname = process.env.APPNAME;

            console.log('');
            console.log('');
            console.log('ne-data: meta default set');
            console.log(meta);
            console.log('');
            console.log('');

            return meta
        }

        meta.appname = process.env.APPNAME;

        console.log('');
        console.log('');
        console.log('ne-data: meta init');
        console.log(meta);
        console.log('');
        console.log('');

        if (meta.neDataCustom){

            var meta = appmeta.custom(meta, req);

            console.log('');
            console.log('');
            console.log('ne-data: meta with custom');
            console.log(meta);
            console.log('');
            console.log('');

            return meta

        }

        else {

            return meta;

            // this.sendMeta(routeMeta);


        }

    },

    serverRender: function (server, appmeta, routes){
        var self = this;

        server.get('*.js', function (req, res) {
            console.log("ne-render: *.js skipped on purpose")
            res.end();
        });

        server.get('*.css', function (req, res) {
            console.log("ne-render: *.css skipped on purpose")
            res.end();
        });

        server.get('*', function (req, res) {

            Router.run(routes, req.path, function (Root, state) {

                // Log pathString
                var pathForMeta = state.routes[1].path;

                console.log('');
                console.log('');
                console.log('neRender: pathForMeta');
                console.log(pathForMeta);
                console.log('');
                console.log('');

                // Compile page meta
                var meta = self.meta(req, appmeta, pathForMeta);
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

                console.log('');
                console.log('');
                console.log('ne-render: meta before ne-data');
                console.log(meta);
                console.log('');
                console.log('');

                // Render the page
                function renderPage (data){

                    state.meta = meta;
                    state.data = data;
                    state.query = req.query;
                    state.body = req.body;
                    if (req.user) {
                        state.user = req.user;
                    }

                    console.log('');
                    console.log('');
                    console.log('ne-render: Rendering < ' + meta.title + ' > from Server - START');
                    console.log('');
                    console.log('');

                    console.log('');
                    console.log('');
                    console.log('ne-render: If your app is hanging after this log');
                    console.log('There is probably something wrong with the handler that is being rendered');
                    console.log('Could be a variable that can not be found');
                    console.log('Could be a syntax error');
                    console.log('Or something else');
                    console.log('');
                    console.log('');

                    var html = React.renderToStaticMarkup(React.createElement(Root, state));
                    var doctype = '<!DOCTYPE html>';
                    var fullHtml = doctype + html;
                    res.send(fullHtml);

                    console.log('');
                    console.log('');
                    console.log('ne-render: Rendering < ' + meta.title + ' > from Server - DONE');
                    console.log('');
                    console.log('');

                }

                var data = {};

                renderPage (data);




            });
        });
    }
};

module.exports = neRender;