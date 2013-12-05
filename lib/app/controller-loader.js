'use strict';

var app = global.app;
var path = require('path');
var fsHelper = require('../helpers/fs');

var ControllerLoader = function () {
  var controllers = {};

  var pushController = function (controller) {
    controllers[controller] = require(path.join('../../controllers', controller));
  };

  fsHelper.traverse('controllers', function(file, callback) {
    var controller = path.basename(file, '.js');
    if (typeof(controllers[controller] != 'undefined')) {
      pushController(controller);
    }
    callback(null, file);
  }, function (err, files) {
  });

  app.controller = function(controller, checkExists) {
    if (typeof(controllers[controller] != 'undefined')) {
      return controllers[controller];
    } else if (checkExists) {
      return false;
    } else {
      throw new Error('Controller ' + controller + ' not found');
    }
  }
}

exports = module.exports = new ControllerLoader();