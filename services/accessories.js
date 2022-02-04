const { Accessory } = require('../models/Accessory');

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        // add price here and in the model
    }
}

async function getAllAccessories() {
    const allAccessories = await Accessory.find({});
    return allAccessories;
}

async function createAccessory(accessory) {
    const newRecord = new Accessory(accessory);
    await newRecord.save();
}

module.exports = {
    getAllAccessories,
    createAccessory
}