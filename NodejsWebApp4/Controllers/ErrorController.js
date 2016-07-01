"use strict";
var fs = require('fs');
var ErrorController = (function () {
    function ErrorController() {
    }
    ErrorController.prototype.NotFound = function (request, response) {
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
    };
    return ErrorController;
}());
exports.ErrorController = ErrorController;
//# sourceMappingURL=ErrorController.js.map