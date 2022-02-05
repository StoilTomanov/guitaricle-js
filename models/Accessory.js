const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String },
    imageUrl: { type: String, default: '' },
    price: { type: Number, min: 0, required: true }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = {
    Accessory,
};