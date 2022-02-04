const { Accessory } = require('../models/Accessory');

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
    }
}

async function getAllAccessories() {
    const allAccessories = await Accessory.find({});
    console.log(allAccessories);
}