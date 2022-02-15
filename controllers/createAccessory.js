const { validationResult } = require("express-validator");

function accessoryGet(req, res) {
    res.locals = {
        title: "Create accessory",
        userStatus: res.userStatus,
    }
    res.render('createAccessory');
}

async function accessoryPost(req, res) {
    const accessory = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        owner: req.session.user.id,
    };

    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }
        await req.storage.createAccessory(accessory);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('createAccessory', { userStatus: res.userStatus, accessory, title: "Create accessory", error, data: { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, price: req.body.price, } });

    }

}

module.exports = {
    accessoryGet,
    accessoryPost,
}