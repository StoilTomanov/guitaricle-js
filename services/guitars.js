const { Guitar } = require('../models/Guitar');
const { guitarViewModel } = require('./util');

// read all records
async function getAll() {
    const allGuitars = await Guitar.find({});
    if (allGuitars) {
        return allGuitars.map(guitar => (guitarViewModel(guitar)));
    }
}

// get record by id
async function getById(id) {
    const guitarById = await Guitar.findById(id).populate('accessories');
    if (guitarById) {
        return guitarViewModel(guitarById);
    } else {
        return undefined;
    }
}

// record creation
async function createGuitar(guitar) {
    const result = new Guitar(guitar);
    if (result.imageUrl == '') {
        result.imageUrl = 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
    }
    if (result.description == '') {
        result.description = 'No description for this article'
    }
    await result.save();
}

// record removal
async function deleteRecord(id, ownerId) {
    if (id) {
        const currentGuitar = await Guitar.findById(id);
        if (currentGuitar.owner != ownerId) {
            return false;
        }

        await Guitar.findByIdAndDelete(id);
        return true;
    }
}

// edit record
async function editRecord(guitar, id, ownerId) {
    if (guitar && id) {
        const currentGuitar = await Guitar.findById(id);

        if (currentGuitar.owner != ownerId) {
            return false;
        }

        currentGuitar.name = guitar.name;
        currentGuitar.description = guitar.description;
        currentGuitar.imageUrl = guitar.imageUrl;
        currentGuitar.price = guitar.price;
        currentGuitar.accessories = guitar.accessories;

        currentGuitar.save();

        return true;
    }
}

async function attachAccessory(guitarId, accessoryId) {
    const currentGuitar = await Guitar.findById(guitarId);

    if (currentGuitar.owner != ownerId) {
        return false;
    }

    currentGuitar.accessories.push(accessoryId);

    await currentGuitar.save();

}

module.exports = {
    getAll,
    getById,
    createGuitar,
    deleteRecord,
    editRecord,
    attachAccessory
}