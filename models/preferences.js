const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: [true, 'type is required'] },
    breed: { type: String, required: [true, 'breed is required'] },
    age: { type: String, required: [true, 'age is required'] },
    gender: { type: String, required: [true, 'gender isr required'] },
    location: { type: String, required: [true, 'location is required'] },
    distance: { type: Number, required: [true, 'distance is required'] },
    size: { type: String, required: [true, 'size is required'] },
});

module.exports = mongoose.model('Preference', preferenceSchema);
