const { getAll, getById, createGuitar, deleteRecord, editRecord } = require('../services/guitars');
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
    }
    next();
}