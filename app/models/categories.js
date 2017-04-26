var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    short_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    special_instructions: {
        type: String,
        required: true
    },
});

var Categories = mongoose.model('categories', categorySchema, 'categories');

module.exports = Categories;
