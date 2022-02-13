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
    }

    await req.storage.createGuitar(guitar);

    res.redirect('/');
}

module.exports = {
    get,
    post,
}