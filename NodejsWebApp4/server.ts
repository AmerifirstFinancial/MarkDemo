import http = require('http');
var url = require('url');
var session = require('session');
var fs = require('fs');
var port = process.env.port || 1337
import { HomeController } from "./Controllers/HomeController";
import { AboutController } from "./Controllers/AboutController";
import { ErrorController } from "./Controllers/ErrorController";
var mime = require('mime');

http.createServer(function (request, response) {
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.toLowerCase();
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

    if (pathname == "/") {
        pathname = "/home/";
    }
    let pathFound: boolean = false;

    //favicon
    if (request.url === '/favicon.ico') {
        pathFound = true;
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end();
        console.log('favicon requested');
        return;
    }

    //Check Content
    if (pathname.indexOf('/content') == 0) {
        pathFound = true;
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                response.writeHead(200, { 'Content-Type': mime.lookup(pathname) });
                response.end(data, 'binary')
            }
        });   

    }

    //Check Controllers
    else if (pathname.indexOf('/home') == 0) {

        let controller = new HomeController();
        if (controller.Request(pathname.substring('/home'.length), request, response)) {
             pathFound = true;
        }
    }
    else if (pathname.indexOf('/about') == 0) {

        let controller = new AboutController();
        if (controller.Request(pathname.substring('/about'.length), request, response)) {
            pathFound = true;
        }
    }

    //Path Not Found
    if (pathFound == false) {
        let controller = new ErrorController();
        controller.NotFound(request, response);
    }


}).listen(port);

console.log('Server running at http://127.0.0.1:8081/');