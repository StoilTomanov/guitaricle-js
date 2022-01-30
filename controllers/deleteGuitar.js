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

async function deleteGuitarPost(req, res) {
    try {
        await req.storage.deleteRecord(req.params.id)
        res.redirect('/');
    } catch (err) {
        res.redirect('/404');
    }

}

module.exports = {
    deleteGuitarGet,
    deleteGuitarPost,
}