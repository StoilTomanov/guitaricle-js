const { Schema, model, Types: { ObjectId } } = require('mongoose');

const guitarSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' }
});

const Guitar = model('Guitar', guitarSchema);

module.exports = {
    Guitar,
}