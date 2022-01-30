async function deleteGuitarGet(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar) {
        res.locals = {
            guitar,
            title: `Guitaricle - Delete ${guitar.name}`
        }
        res.render('delete');
    } else {
        res.redirect('/404');
    }
}

function deleteGuitarPost(req, res) {
    req.storage.deleteRecord(req.params.id)
    res.redirect('/');
}

module.exports = {
    deleteGuitarGet,
    deleteGuitarPost,
}