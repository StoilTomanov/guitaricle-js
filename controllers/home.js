async function home(req, res) {
    const guitars = await req.storage.getAll(req.query);
    res.locals = {
        userStatus: res.userStatus,
        guitars,
        query: req.query,
        title: 'Guitaricle',
    }
    res.render('index');
}

module.exports = {
    home,
}