const { Schema, model } = require('mongoose');

const guitarSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
});

const Guitar = model('Guitar', guitarSchema);

module.exports = {
    Guitar,
}