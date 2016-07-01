"use strict";
var HomeModel_1 = require("../Models/HomeModel");
var fs = require('fs');
var HomeController = (function () {
    function HomeController() {
    }
    HomeController.prototype.Request = function (pathname, request, response) {
        if (pathname == '/' || pathname == '') {
            this.Index(pathname, request, response);
            return true;
        }
        return false;
    };
    HomeController.prototype.Index = function (pathname, request, response) {
        var vash = require('vash');
        vash.config.settings = vash.config.settings || {};
        response.writeHead(200, { 'Content-Type': 'text/html' });
        var model = new HomeModel_1.HomeModel();
        fs.readFile('./Views/Home/Index.vash', 'utf8', function (err, data) {
            var tpl = vash.compile(data.toString());
            var rendered = tpl({}, function sealLayout(err, ctx) {
                response.write(ctx.finishLayout()); // TODO: undocumented
                response.end();
            });
        });
    };
    return HomeController;
}());
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map