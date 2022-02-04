const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String },
    imageUrl: { type: String, default: '' },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = {
    Accessory,
};