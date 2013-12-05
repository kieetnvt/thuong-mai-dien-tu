'use strict';

var app = global.app;

var BaseRoutes = function () {
    var METHODS = [
            'get',
            'post',
            'put',
            'head',
            'delete',
            'options',
            'trace',
            'copy',
            'lock',
            'mkcol',
            'move',
            'propfind',
            'proppatch',
            'unlock',
            'report',
            'mkactivity',
            'checkout',
            'merge',
            'm-search',
            'notify',
            'subscribe',
            'unsubscribe',
            'patch',
            'all',
            'del'
        ],
        routes = new Array();
    for (var i=0; i<METHODS.length; i++) {
      (function (method) {
        this[method] = function (path, action) {
          var controller = action.split('#')[0],
            action = action.split('#')[1];

        routes.push({
          method: method,
          path: path,
          controller: controller,
          action: action
        });

        app[method].call(app, path, function () {
          if(app.controller(controller, true)) {
            app.controller(controller)[action].apply(this, arguments);
          }
        }, new Function);
        }
      }).call(this, METHODS[i]);
    }
}

exports = module.exports = BaseRoutes;