"use strict";
var AboutModel_1 = require("../Models/AboutModel");
var fs = require('fs');
var AboutController = (function () {
    function AboutController() {
    }
    AboutController.prototype.Request = function (pathname, request, response) {
        if (pathname == '/' || pathname == '') {
            this.Index(pathname, request, response);
            return true;
        }
        return false;
    };
    AboutController.prototype.Index = function (pathname, request, response) {
        var vash = require('vash');
        vash.config.settings = vash.config.settings || {};
        response.writeHead(200, { 'Content-Type': 'text/html' });
        var model = new AboutModel_1.AboutModel();
        fs.readFile('./Views/About/Index.vash', 'utf8', function (err, data) {
            var tpl = vash.compile(data.toString());
            var rendered = tpl({}, function sealLayout(err, ctx) {
                response.write(ctx.finishLayout());
                response.end();
            });
        });
    };
    return AboutController;
}());
exports.AboutController = AboutController;
//# sourceMappingURL=AboutController.js.map