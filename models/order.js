var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    modelName = 'Order';

var schema = new Schema({

  _user_name: {type: String, ref: 'User'},
  _products_id: [{ type:Schema.Types.ObjectId, ref: 'Product' }],
  _number: {type: Number},
  _submit_buy: {type: Boolean, default: false},
  _user_confirm: {type: Boolean, default: false},
  _payment_method: {type: String, default: ""},
  _account_number:{type: String, default:""}

});

exports = module.exports = mongoose.model(modelName, schema);