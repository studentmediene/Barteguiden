import mongoose from 'mongoose';

const VenueSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    latitude: Number,
    longitude: Number,
});

export default mongoose.model('Venue', VenueSchema);
