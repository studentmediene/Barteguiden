import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    externalId: Number,
    description: { type: String, trim: true },
    startAt: Date,
    endAt: Date,
    venue: {
        name: { type: String, trim: true },
        address: { type: String, trim: true },
        longitude: Number,
        latitude: Number,
    },
    ageLimit: Number,
    price: Number,
    category: { type: String, trim: true },
    tags: [String],
    imageUrl: { type: String, trim: true },
    eventUrl: { type: String, trim: true },
    isPromoted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
