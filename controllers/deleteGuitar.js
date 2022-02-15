async function deleteGuitarGet(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar.owner != req.session.user.id) {
        return res.redirect('/login');
    }

    if (guitar) {
        res.locals = {
            guitar,
            title: `Guitaricle - Delete ${guitar.name}`,
            userStatus: res.userStatus,
        }
        res.render('delete');
    } else {
        res.redirect('/404');
    }
}

async function deleteGuitarPost(req, res) {
    try {
        if (await req.storage.deleteRecord(req.params.id, req.session.user.id)) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect('/404');
    }

}

module.exports = {
    deleteGuitarGet,
    deleteGuitarPost,
}