var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    modelName = 'Product';

var schema = new Schema({

  name: {type: String, require: true},
  category_alias: {type: String, require: true, ref : 'Category'},
  price: {type: Number, require: false},
  img: {type: String, require: false},
  detail: {type: String, require: false},
  time_to_buy: {type: Date, require: false, default:Date.now},
  man_buy: {type: Number, require: true},
  expire: {type: Boolean, require:true, default:false}

});

exports = module.exports = mongoose.model(modelName, schema);
