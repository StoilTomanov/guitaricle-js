const fs = require('fs/promises');

const filePath = './services/data.json';

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

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error!');
        console.error(err);
        process.exit(1);
    }
}

async function getAll() {
    const data = await read();
    return Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v))
}

async function getById(id) {
    const data = await read();
    const guitar = data[id];

    if (guitar) {
        return Object.assign({}, { id }, guitar);
    } else {
        return undefined;
    }

}

function generateId() {
    const id = [];
    Array.from('xxxxxxxxx').forEach(x => {
        id.push(Math.ceil(Math.random() * 16));
    });
    return id.join('');
}

async function createGuitar(guitar) {
    const guitars = await read();
    console.log(guitars);
    let id;

    do {
        id = generateId();
    } while (guitars.hasOwnProperty(id));

    guitars[id] = guitar;

    await write(guitars);

}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createGuitar,
    }
    next();
}