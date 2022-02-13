async function home(req, res) {
    const guitars = await req.storage.getAll();
    res.locals = {
        userStatus: res.userStatus,
        guitars,
        title: 'Guitaricle',
    }
    res.render('index');

}

module.exports = {
    home,
}