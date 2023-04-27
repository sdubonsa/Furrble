const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    preferences: { type: Array, required: [true, 'preferences are required'] },
});

module.exports = mongoose.model('Preference', preferenceSchema);
