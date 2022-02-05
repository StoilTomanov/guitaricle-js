const { getAll, getById, createGuitar, deleteRecord, editRecord, attachAccessory } = require('../services/guitars');
const { getAllAccessories, createAccessory } = require('../services/accessories');

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createGuitar,
        deleteRecord,
        editRecord,
        getAllAccessories,
        createAccessory,
        attachAccessory,
    }
    next();
}