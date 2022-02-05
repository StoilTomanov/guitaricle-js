const { Accessory } = require('../models/Accessory');
const { accessoryViewModel } = require('./util');

async function getAllAccessories() {
    const allAccessories = await Accessory.find({});
    return allAccessories.map(accessoryViewModel);
}

async function createAccessory(accessory) {
    const newRecord = new Accessory(accessory);
    await newRecord.save();
}

module.exports = {
    getAllAccessories,
    createAccessory
}