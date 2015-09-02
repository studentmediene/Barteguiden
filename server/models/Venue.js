var mongoose = require('mongoose');


var VenueSchema = new mongoose.Schema({
    name: String,
    address: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('Venue', VenueSchema);
