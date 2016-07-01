import http = require('http');

var fs = require('fs');
export class ErrorController {
    constructor() {

    }

    NotFound(request: http.ServerRequest, response: http.ServerResponse) {

        var vash = require('vash');
        vash.config.settings = vash.config.settings || {};
        response.writeHead(404, { 'Content-Type': 'text/html' });

        fs.readFile('./Views/Error/404.vash', 'utf8', function (err, data) {
            var tpl = vash.compile(data.toString());
            var rendered = tpl({}, function sealLayout(err, ctx) {
                response.write(ctx.finishLayout()); 
                response.end();
            });         
        });   
     
    }
}