const { validationResult } = require("express-validator");

function get(req, res) {
    res.locals = {
        title: "Add a guitar",
        userStatus: res.userStatus,
    }
    res.render('create');
}

async function post(req, res) {
    const guitar = {
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

        await req.storage.createGuitar(guitar);
        res.redirect('/');

    } catch (error) {
        console.error(error);
        if (error.name == 'ValidationError') {
            error = Object.values(error.errors).map(e => ({ msg: e.message }))
        }
        res.render('create', { userStatus: res.userStatus, guitar, title: "Create", error, data: { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, price: req.body.price, } });
    }

}

module.exports = {
    get,
    post,
}