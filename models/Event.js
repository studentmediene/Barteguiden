var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    startAt: Date,
    endAt: Date,
    venue: {
        name: String,
        address: String,
        longitude: Number,
        latitude: Number
    },
    ageLimit: Number,
    price: Number,
    category: String,
    tags: [String],
    imageUrl: String,
    eventUrl: String,
    isPromoted: Boolean,
    isPublished: Boolean
})

module.exports = mongoose.model('Event', EventSchema);
