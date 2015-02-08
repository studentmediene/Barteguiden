var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    //ownerId: String,
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
