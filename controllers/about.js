function about(req, res) {
    res.locals = {
        title: "About",
        userStatus: res.userStatus,
    }
    res.render('about');
}

module.exports = {
    about,
}