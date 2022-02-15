const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String },
    imageUrl: { type: String, default: 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg' },
    price: { type: Number, min: 0, required: true, default: 'Free' },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = {
    Accessory,
};