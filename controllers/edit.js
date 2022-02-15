const { validationResult } = require("express-validator");

async function editGet(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar.owner != req.session.user.id) {
        return res.redirect('/login');
    }

    if (guitar) {
        res.locals = {
            guitar,
            title: `Guitaricle - Edit ${guitar.name}`,
            userStatus: res.userStatus,
        }
        res.render('edit');
    } else {
        res.redirect('/404');
    }
}

async function editPost(req, res) {
    const id = req.params.id;
    const { errors } = validationResult(req);

    const guitar = {
        id,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
    }

    try {
        if (errors.length > 0) {
            throw errors;
        }

        if (await req.storage.editRecord(guitar, id, req.session.user.id)) {
            res.redirect('/')
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.render('edit', { userStatus: res.userStatus, guitar, title: "Edit", error, data: { name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, price: req.body.price, } });
    }

}

module.exports = {
    editGet,
    editPost,
}