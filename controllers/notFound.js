function notFound(req, res) {
    res.locals = {
        title: "Guitaricle",
        userStatus: res.userStatus,
    }
    res.render('404');
}

module.exports = {
    notFound,
}