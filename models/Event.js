var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Event', EventSchema);
