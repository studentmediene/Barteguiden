var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    shows: [{
        startDate: Date,
        endDate: Date,
    }],
    venue: {
        name: String,
        address: String,
        latitude: String,
        longitude: String,
    },
    ageLimit: Number,
    price: Number,
    tags: [String],
    imageUrl: String,
    eventUrl: String,
    isPromoted: Boolean
})

module.exports = mongoose.model('Event', EventSchema);
