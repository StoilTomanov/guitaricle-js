async function home(req, res) {
    const guitars = await req.storage.getAll();
    res.locals = {
        userStatus: res.userStatus,
        guitars,
        title: 'Guitaricle',
    }
    res.render('index');
    console.log(res.locals);
}

module.exports = {
    home,
}