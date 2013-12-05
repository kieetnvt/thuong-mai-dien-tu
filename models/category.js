var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    modelName = 'Category';

var schema = new Schema({
  category_name : {type : String, requrie : true},
  category_alias : {type : String, require : true}
});

exports = module.exports = mongoose.model(modelName, schema);