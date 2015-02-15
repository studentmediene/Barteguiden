var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    shows: [{
        startAt: String,
        endAt: String,
    }],
    venue: {
        name: String,
        address: String,
        latitute: String,
        longitude: String,
    },
    ageLimit: Number,
    price: Number,
    tags: [String],
    imageUrl: String,
    eventUrl: String,
})

module.exports = mongoose.model('Event', EventSchema);
