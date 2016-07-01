import http = require('http');
import { AboutModel } from "../Models/AboutModel";
var fs = require('fs');

export class AboutController {
    constructor() {

    }
    Request(pathname: string, request: http.ServerRequest, response: http.ServerResponse): boolean {
        if (pathname == '/' || pathname == '') {
            this.Index(pathname, request, response);
            return true;
        }
        return false;
    }

    private Index(pathname: string, request: http.ServerRequest, response: http.ServerResponse) {

        var vash = require('vash');
        vash.config.settings = vash.config.settings || {};

        response.writeHead(200, { 'Content-Type': 'text/html' });
        let model = new AboutModel();
       
        fs.readFile('./Views/About/Index.vash', 'utf8', function (err, data) {
            var tpl = vash.compile(data.toString());
            var rendered = tpl({}, function sealLayout(err, ctx) {
                response.write(ctx.finishLayout());
                response.end();
            });         
        });   
     
    }
}