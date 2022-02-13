async function details(req, res) {
    const id = req.params.id;
    const guitar = await req.storage.getById(id);

    if (guitar) {
        res.locals = {
            guitar,
            title: `Guitaricle - ${guitar.name}`,
            userStatus: res.userStatus,
        }
        res.render('details');
    } else {
        res.redirect('/404');
    }

}

module.exports = {
    details,
}