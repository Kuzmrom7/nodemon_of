const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  id_place: String,
  id_address: String,
  name_user: String,
  phone : String,
  dishes: [{
    id_dish: String,
    spec_name: String,
    price: Number
  }],
  total: Number
});


module.exports = mongoose.model('Order', productSchema);