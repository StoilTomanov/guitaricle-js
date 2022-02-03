const { Schema, model } = require('mongoose');

const guitarSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
});

const Guitar = model('Guitar', guitarSchema);

module.exports = {
    Guitar,
}