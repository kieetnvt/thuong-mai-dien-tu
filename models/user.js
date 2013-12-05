var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    modelName = 'User';

var schema = new Schema({

  user_name: {type:String, require: true},
  user_password: {type:String, require: true},
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]

});

exports = module.exports = mongoose.model(modelName, schema);