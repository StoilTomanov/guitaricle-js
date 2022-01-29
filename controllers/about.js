function about(req, res) {
    res.locals = {
        title: "About",
    }
    res.render('about');
}

module.exports = {
    about,
}