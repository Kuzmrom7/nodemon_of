const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date : mongoose.Schema.Types.Date,
  id_place: String,
  id_address: String,
  name_user: String,
  phone: String,
  dishes: Array,
  status : String,
  id_user: String,
  total: Number
});


module.exports = mongoose.model('Order', productSchema);