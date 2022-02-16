const { Schema, model, Types: { ObjectId } } = require('mongoose');

const guitarSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, min: 0, required: true },
    imageUrl: { type: String, match: [/^https?:\/\//, 'Image URL must be a valid URL address'] },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner: { type: ObjectId, ref: 'User' }
});

const Guitar = model('Guitar', guitarSchema);

module.exports = {
    Guitar,
}