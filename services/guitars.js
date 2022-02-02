const fs = require('fs/promises');
const { Guitar } = require('../models/Guitar');

function guitarViewModel(guitar) {
    return {
        id: guitar._id,
        name: guitar.name,
        description: guitar.description,
        price: guitar.price,
        imageUrl: guitar.imageUrl,
    }
}

// read all records
async function getAll() {
    const allGuitars = await Guitar.find({});
    if (allGuitars) {
        return allGuitars.map(guitar => (guitarViewModel(guitar)));
    }
}

// get record by id
async function getById(id) {
    const guitarById = await Guitar.findById(id);
    if (guitarById) {
        return guitarViewModel(guitarById);
    }
}

// record creation
async function createGuitar(guitar) {
    const result = new Guitar(guitar);
    await result.save();
}

// record removal
async function deleteRecord(id) {
    if (id) {
        await Guitar.findByIdAndDelete(id);
    }
}

// edit record
async function editRecord(guitar, id) {
    if (guitar && id) {
        await Guitar.findByIdAndUpdate(id, guitar);
    }
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createGuitar,
        deleteRecord,
        editRecord,
    }
    next();
}