import mongoose from 'mongoose';
import mongooseBcrypt from 'mongoose-bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
    },
});

UserSchema.plugin(mongooseBcrypt);

export default mongoose.model('User', UserSchema);
