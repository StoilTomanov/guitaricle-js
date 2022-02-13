const e = require("express");

async function editGet(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar.owner != req.session, user.id) {
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
    const guitar = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
    }
    try {
        if (await req.storage.editRecord(guitar, id, req.session.user.id)) {
            res.redirect('/')
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/404');
    }

}

module.exports = {
    editGet,
    editPost,
}