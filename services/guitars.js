const fs = require('fs/promises');

const filePath = './services/data.json';

// read data
async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error!');
        console.error(err);
        process.exit(1);
    }
}

// write data
async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error!');
        console.error(err);
        process.exit(1);
    }
}

// read all records
async function getAll() {
    const data = await read();
    return Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v))
}

// get record by id
async function getById(id) {
    const data = await read();
    const guitar = data[id];

    if (guitar) {
        return Object.assign({}, { id }, guitar);
    } else {
        return undefined;
    }

}

// id generator
function generateId() {
    const id = [];
    Array.from('xxxxxxxxx').forEach(x => {
        id.push(Math.ceil(Math.random() * 16));
    });
    return id.join('');
}

// record creation
async function createGuitar(guitar) {
    const guitars = await read();
    let id;

    do {
        id = generateId();
    } while (guitars.hasOwnProperty(id));

    guitars[id] = guitar;

    await write(guitars);

}

// record removal
async function deleteRecord(id) {
    const guitars = await read();
    if (guitars.hasOwnProperty(id)) {
        delete guitars[id];
        await write(guitars);
    } else {
        return undefined;
    }
}

// edit record
async function editRecord(guitar, id) {
    const guitars = await read();
    if (guitars.hasOwnProperty(id)) {
        guitars[id] = guitar;
        await write(guitars);
    } else {
        return undefined;
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