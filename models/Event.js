var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    ownerId: String,
})

module.exports = mongoose.model('Event', EventSchema);
