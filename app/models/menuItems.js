var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var itemSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    short_name: { type: String },
    name: { type: String },
    description: { type: String },
    price_small: { type: Currency },
    price_large: { type: Currency },
    small_portion_name: { type: String },
    large_portion_name: { type: String }
});

var menuItems = mongoose.model('menuItems', itemSchema, 'menu_items');

module.exports = menuItems;
