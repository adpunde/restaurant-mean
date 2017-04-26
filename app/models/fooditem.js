var mongoose = require('mongoose');

module.exports = mongoose.model('fooditem', {
    name: {type: String, required: true},
    category: {type: String, required: true}
});
