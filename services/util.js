const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

function guitarViewModel(guitar) {
    const model = {
        id: guitar._id,
        name: guitar.name,
        description: guitar.description,
        price: guitar.price,
        imageUrl: guitar.imageUrl,
        accessories: guitar.accessories,
        owner: guitar.owner,
    }
    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }
    return model;

}

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        owner: accessory.owner,
    }
}

function isLoggedIn() {
    return function(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    guitarViewModel,
    accessoryViewModel,
    hashPassword,
    comparePassword,
    isLoggedIn,
}