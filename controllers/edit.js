async function editGet(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar) {
        res.locals = {
            guitar,
            title: `Guitaricle - Edit ${guitar.name}`
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
        req.storage.editRecord(guitar, id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/404');
    }

}

module.exports = {
    editGet,
    editPost,
}