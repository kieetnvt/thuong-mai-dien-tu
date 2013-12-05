'use strict';

var app = global.app;
var path = require('path');
var fsHelper = require('../helpers/fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://'
        + app.config.MongoDB.host + ':'
        + app.config.MongoDB.port + '/'
        + app.config.MongoDB.dbName);

var db = mongoose.connection;
db.on('error', function () {
  console.error('connection error');
});
db.once('open', function (){
  console.log("Connected to MongoDB!");
});

var ModelLoader = function () {
  var models = {};

  var pushModel = function (model) {
    models[model] = require(path.join('../../models', model));
  };

  fsHelper.traverse('models', function(file, callback) {
    var model = path.basename(file, '.js');
    if (typeof(models[model] != 'undefined')) {
      pushModel(model);
    }
    callback(null, file);
  }, function (err, files) {
    app.model = function(model, checkExists) {
      if (typeof(models[model] != 'undefined')) {
        return models[model];
      } else if (checkExists) {
        return false;
      } else {
        throw new Error('model ' + model + ' not found');
      }
    }
  });

}

exports = module.exports = new ModelLoader();