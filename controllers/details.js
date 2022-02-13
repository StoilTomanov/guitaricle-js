async function details(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar) {
        if (req.session.user && req.session.user.id == guitar.owner) {
            res.locals = {
                guitar,
                title: `Guitaricle - ${guitar.name}`,
                userStatus: res.userStatus,
                isOwner: true,
            }
        } else {
            res.locals = {
                guitar,
                title: `Guitaricle - ${guitar.name}`,
                userStatus: res.userStatus,
            }
        }

        res.render('details');
    } else {
        res.redirect('/404');
    }

}

module.exports = {
    details,
}