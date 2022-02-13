async function home(req, res) {
    const guitars = await req.storage.getAll();
    console.log(res.locals);
    res.locals = {
        guitars,
        title: 'Guitaricle',
    }
    res.render('index');
    console.log(res.userStatus);
}

module.exports = {
    home,
}