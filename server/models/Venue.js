var mongoose = require('mongoose');


var VenueSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    aliases: {type: [String], required: true, default: []},
    address: {type: String, trim: true},
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('Venue', VenueSchema);
